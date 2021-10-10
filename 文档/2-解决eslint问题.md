# eslint 报错

### 1，暂时重启文档不使用eslint

解决：目前想要实现业务功能，所以不聚焦eslint的问题，所以重新开启一个文档和分支

备注：明白eslint还是一个重要的东西，不能绕过去，后边回到之前的分支再重点解决



### 2，关闭eslint 报错

package.json里面，删除eslint 的 config

```json
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
```

—— 但是会报错 

```js
Syntax Error: Error: No ESLint configuration found in C:\Users\jean\Documents\GitHub\vue_egg_shop_demo\web_vue2\src\components.

You may use special comments to disable some warnings.
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.
```

### 3，修改eslint  —— 变量声明后不使用

```js
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
      "no-unused-vars": 0  // 关闭这个规则
    }
  },
```

