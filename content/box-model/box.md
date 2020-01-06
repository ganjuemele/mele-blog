### 盒模型

[./box.jpg]
* **content-box**
``` css
.content {
    border: 5px solid mediumvioletred;
    padding: 30px;
    margin: 50px;
    width: 200px;
    background-color: #dee4f3;
    box-sizing: content-box;
}
```
[image:/content-box.jpg]
`box-sizing: content-box; ` 设置以内容的width为基准
内容的宽度=width

* **border-box**
``` css
.box {
    border: 5px solid orange;
    padding: 30px;
    margin: 50px;
    width: 200px;
    background-color: #22ff22;
    box-sizing: border-box;
}
```
[image:/border-box.jpg]
`box-sizing: border-box;` 设置以border边框为基准
width= 内容+padding+border

⚠️border-box比content-box更好用一点
