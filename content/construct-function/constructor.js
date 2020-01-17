// function Person(你来补全代码){
//     你来补全代码
// }
// let person = new Person('frank', 18)
// person.name === 'frank' // true
// person.sayHi() // 打印出「你好，我叫 frank」
// let person2 = new Person('jack', 19)
// person2.sayHi() // 打印出「你好，我叫 jack」

//一
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.sayHi = function () {
//     console.log('你好，我叫 '+this.name);
// };
// let person = new Person('frank', 18);
// person.sayHi();
// let person2 = new Person('jack', 19);
// person2.sayHi();

//二.class再次实现
// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     sayHi(){
//         console.log('你好，我叫 '+ this.name)
//     }
// }
//
// let person = new Person('frank', 18);
// person.sayHi(); // 打印出「你好，我叫 frank」
//
// let person2 = new Person('jack', 19);
// person2.sayHi(); // 打印出「你好，我叫 jack」
// // console.log(person.name, person2.constructor);