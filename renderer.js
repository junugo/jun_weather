/**
 * 这个文件是通过 index.html 文件中的 <script> 标签加载的
 * 在该窗口的渲染进程中执行。没有 Node.js API
 * 在这个过程中可用，因为 'nodeIntegration' 被关闭并且
 * “contextIsolation” 已开启。使用 'preload.js' 中的 contextBridge API
 * 从主进程中暴露 Node.js 功能。
 */
const city = document.getElementById("city");
const weatherImage = document.getElementById("weather_image");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const date = document.getElementById("date");

var Data = {};
var day = 1
var night = false;

function checkWeather() {
  console.log("开始更新天气");
  ipcRenderer.send("renderer-request-update-weather");
}

function show(){
    data = Data["results"][0];
    console.info(data);
    city.textContent = data.location.name;
    dayData=data.daily[day]
    temperature.textContent = `${dayData.low}-${dayData.high} ℃`;
    date.textContent = dayData.date;
    if (day==0){date.textContent = "今天 "+date.textContent}
    if (day==1){date.textContent = "明天 "+date.textContent}
    if(!night){
      weather.textContent = dayData.text_day;
      weatherImage.src = `./white/${dayData.code_day}.png`;
    }
    else{
      weather.textContent = dayData.text_night;
      weatherImage.src = `./black/${dayData.code_night}.png`;
      date.textContent += " (晚)"
    }
}

// 监听主进程返回的天气数据
ipcRenderer.on("response-from-main-weather", (event, weatherData) => {
  if (weatherData.error) {
    city.textContent = "获取天气数据失败";
    weather.textContent = "错误";
    temperature.textContent = "错误";
  } else {
    Data = weatherData;
    show();
  }
});

ipcRenderer.on("to_day", (event, to_day) => {
  day=to_day;
  show();
});

checkWeather();
setInterval(checkWeather, 60000);
date.onclick = function(){
  day += 1;
  day %= Data["results"][0].daily.length;
  show();
}
weatherImage.onclick = function(){
  night = !night;
  show();
}

// 注册 ipcRenderer 事件监听器时，不需要显式移除监听器
// Electron 和 JavaScript 会自动管理内存
