# 快速开始
```javascript
git clone https://github.com/gaoxinxiao/react_cli_4.0
npm run dev            开发模式启动项目
npm run build:dll      dllplugin进行打包
npm run build          生产模式打包项目
```


从0 开始搭建的脚手架 适用后台管理系统


用到的技术
react + mobx + typescript + antd + antd-design-pro +react-router-config + react-router-dom


antd lodash 等第三方包都被拉出来单独打包这样在每一次打包的时候能大大的提升打包速度 （因为他们不是经常更改的 没有必要每次都打包）

除了react其他js都被缓存起来 用catch-loader  每次浏览器请求js直接去缓存拿数据就好

页面都用react-loadable 进行按需加载 


rc-animate页面切换动画
