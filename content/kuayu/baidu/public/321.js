console.log('这是baidu.js文件');
// const request = new XMLHttpRequest();
// request.open('GET', 'http://localhost:9000/friends.json');
// request.onreadystatechange = () => {
// 	if (request.readyState === 4 && request.status === 200)	{
// 		console.log(request.response)
// 	}
// }
// request.send();

const script = document.createElement('script');
script.src = 'http://localhost:9000/friends.js';
script.onload = () => {

};
document.body.appendChild(script);