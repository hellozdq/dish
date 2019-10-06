#使用了vant
npm i vant -S

# 使用方法1  安装插件
npm i babel-plugin-import -D

// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
// 接着你可以在代码中直接引入 Vant 组件
// 插件会自动将代码转化为方式二中的按需引入形式
import { Button } from 'vant';

# npm设置成淘宝 或直接使用cnpm
npm config set registry http://registry.npm.taobao.org/
npm i -g cnpm --registry=https://registry.npm.taobao.org
# npm 换回原来的
npm config set registry https://registry.npmjs.org/
