# #使用github搭建静态页面

进入 [github](https://github.com) 网站新建项目，选取 ssh地址

新建 project 文件夹
`mkdir project`
进入 project
`cd project`
新建 页面
`touch index.html`

使用编辑器在 index.html 文件中写入你要展示的页面

本地打开终端<br>
初始化git
`git init`<br>
添加需要git的目录
`git add .` <br>
提交add的文件版本
`git commit -v`
`git remote add origin <github项目的ssh地址>`
上传master分支到 远程仓库
`git push -u origin master`

进入github项目 >> setting  >> GitHub Pages >> 选择 master 分支
[静态页面](https://ganjuemele.github.io/mele-blog/) 搭建成功