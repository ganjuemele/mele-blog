const fs = require("fs");
//读数据库
const usersString = fs.readFileSync('./db/users.json').toString()
const usersArray = JSON.parse(usersString)

//写
const newUser = {id:4, name:'jack', password: 'xyz'}
usersArray.push(newUser)
const string = JSON.stringify(usersArray)
fs.writeFileSync('./db/users.json', string)