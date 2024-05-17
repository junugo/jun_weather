**郡气 (jun Weather)**
-
一款轻量简易的天气应用，用于 Electron 编程学习

这是一个用 Electron 编写的天气应用，拥有简约的界面，您也可以自行配置在 `main.js` 自行配置 api

此程序仅为学习所作，如果有如何 BUG ，欢迎提交 Issues ~~(不会有的)~~

当然，非常欢迎您参加到这款软件的开发中，如果您有好的想法，欢迎提交 Pull Request

~~莫吐槽我的垃圾代码~~

# function - 功能
- 能够根据 ip 位置显示当地天气情况，默认为 3 天(今天/明天/后天 - 早/晚) (由心知天气免费 api 限制)
- 点击天气图标可切换日夜模式
- 点击日期可切换显示的天气日期（标题菜单也提供了日期选项）

# Install and Develop - 安装与开发
您可以直接安装我们的 [编译版本](https://github.com/junugo/jun_weather/releases) ，或者使用代码编译

- 拉取代码
```
git clone https://github.com/junugo/jun_weather.git
cd jun-weather
```
## npm 管理包
如果您使用`npm`管理包

- 安装
```
npm install
```
- 运行
```
npm start
```
- 打包
```
npm run build
```
## yarn 管理包
如果您使用`yarn`管理包

- 安装
```
yarn install
```
- 运行
```
yarn start
```
- 打包
```
yarn build
```

# Thanks for [心知天气](https://www.seniverse.com/)
他们提供的免费天气 api 真的很好用，感谢！

我的代码中默认 api 为我的免费心知天气 api

如果您需要使用自己的 api，并修改 `main.js` 中的 api 配置，您同样可以申请心知天气的免费 api

如果您想获取更多天气信息，也可以考虑使用付费 api，如 [彩云天气](https://www.caiyunapp.com/)