# webapp_vue

## 一，开发日志

### 1，环境配置

1.1）设置热更新和自动打开浏览器

```json
    "dev": "vue-cli-service serve --hot --open",
```

这个也可以再vue.config.js的webpack配置中配置，

```js
  devServer: {
    proxy: 'http://localhost:7001', // 反向代理
    open: true, // 自动打开浏览器
    disableHostCheck: true, // 取消检查host
  },
```



### 2，页面开发

2.1）第一阶段需求 —— 用户功能

登录

注销

修改密码

2.2）开发登录页面

2.2.1）让登录页面撑满全屏



