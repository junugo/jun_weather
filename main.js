// 用于控制应用程序生命周期以及创建原生浏览器窗口的模块
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("node:path");

function createWindow() {
  // 创建浏览器窗口。
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    AutoHideMenuBar: "hide", // 隐藏顶部菜单栏
  });
  ipcMain.on("renderer-request-update-weather", async () => {
    try {
      const key = "S0P_hN0C93_VenrHE";
      const response = await fetch(
        `https://api.seniverse.com/v3/weather/daily.json?key=${key}&location=ip&language=zh-Hans&unit=c&start=0&days=5`
      );
      const data = await response.json();
      mainWindow.webContents.send("response-from-main-weather", data);
    } catch (error) {
      mainWindow.webContents.send("response-from-main-weather", {
        error: error.message,
      });
    }
  });

  // 加载应用程序的 index.html。
  mainWindow.loadFile("index.html");

  let menuStructure = [
    {
      label: "About",
      submenu: [
        { label: "Minimize-最小化", role: "minimize" },
        {
          label: "Github-Github代码仓库",
          click: () => {
            shell.openExternal("https://github.com/junugo/jun_weather");
          },
        },
        { type: "separator" },
        {
          label: "Toggle Developer Tools-开发者工具",
          click() {
            mainWindow.webContents.openDevTools();
          },
        },
        { type: "separator" },
        { label: "Exit-退出", role: "quit" },
      ],
    },
    {
      label: "Date",
      submenu: [
        {
          label: "Today-今天",
          click: () => {
            mainWindow.webContents.send("to_day", 0);
          },
        },
        {
          label: "Tomorrow-明天",
          click: () => {
            mainWindow.webContents.send("to_day", 1);
          },
        },
        {
          label: "The day after tomorrow-后天",
          click: () => {
            mainWindow.webContents.send("to_day", 2);
          },
        },
      ],
    },
  ];
  let menu = Menu.buildFromTemplate(menuStructure);
  Menu.setApplicationMenu(menu);

  // 打开开发者工具。
  // mainWindow.webContents.openDevTools()
  //mainWindow.webContents.openDevTools()
}

// 当 Electron 完成初始化并且准备好创建浏览器窗口时，将调用此方法。
// 某些 API 只有在此事件发生后才能使用。
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // 在 macOS 上，当点击应用程序的 dock 图标时，如果没有任何其他窗口打开，
    // 重新创建应用程序窗口是常见的做法。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口都关闭时退出，除了在 macOS 上。在那里，应用程序及其菜单栏
// 通常会保持活动状态，直到用户明确使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// 在此文件中，您可以包含应用程序其余特定的主进程代码。
// 您也可以将它们放在单独的文件中，并在这里引入它们。

// 在主进程中
