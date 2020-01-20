let html = document.querySelector("#demo");
let style = document.querySelector('#style');

let string = `/*你好，我是么了，之前在上海一家国企就职。
接下来要加点样式了。*/
* {
  margin: 0;
  padding: 0;
}
#demo {
  border:1px solid black;
}
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
			n += 1;
			step();
		}
	}, 0)
};

step();