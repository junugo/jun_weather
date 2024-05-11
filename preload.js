/**
preload脚本在' index.html '加载之前运行
*在渲染器。它还可以访问web api
*电子的渲染处理模块和一些填充
* Node.js函数。
*
* https://www.electronjs.org/docs/latest/tutorial/sandbox
*/
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
    return () => ipcRenderer.removeAllListeners(channel);
  }
});