let html = document.querySelector("#demo");
let style = document.querySelector('#style');

let string = `/*你好，我是么了。
接下来加点样式。*/
* {
  margin: 0;
  padding: 0;
}
/*画个太极图吧*/
#div1 {
  border: 1px solid red;
  width: 200px;
  height: 200px;
}
#div1 {
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  border: none;
}
#div1 {
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
}
/*加两个混元珠*/
#div1::before {
  width: 100px;
  height: 100px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);
}
#div1::after {
  width: 100px;
  height: 100px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%);
}
/*太极图就这样画好了*/
`;
// console.log('string的长度'+string.length);
let n = 0;
let string2 = ``;
html.innerHTML = string.substring(0, n);

let step = () => {
	setTimeout(() => {
		if(string[n] === "\n") {
			string2 += string[n] + "</br>";
		} else if(string[n] === " "){
			string2 += string[n] + "&nbsp;"
		} else {
			string2 += string[n]
		}
		// string2 += string[n] === "\n" ? "</br>" : string[n];
		html.innerHTML = string2;
		style.innerHTML = string.substring(0, n);
		// console.log(style)
		if (n < string.length - 1) {
			window.scrollTo(0, 10000);
			html.scrollTo(0, 10000);
			n += 1;
			step();
		}
	}, 0)
};

step();