//测试 server.js用
console.log('加载 JS 文件');
const request = new XMLHttpRequest();

window.onload = () => {
	request.open('GET', '/main.css');
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			const style = document.createElement('style');
			style.innerHTML = request.response;
			document.head.appendChild(style);
			console.log('加载 CSS')
		}
	};
	request.onerror = () => {
		console.log('css 错误');
	};
	request.send();
};
//加载
getXML.onclick = () => {
	request.open('GET', '/main.xml');
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			const dom = request.responseXML;
			const text = dom.getElementsByTagName('warning')[0].textContent;
			console.log('加载 XML 文件 ==>>', text.trim())
		}
	};
	request.onerror = () => {
		console.log('xml 错误');
	};
	request.send();
};

getJSON.onclick = () => {
	request.open('GET', '/main.json');
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			const object = JSON.parse(request.response);
			console.log('加载 JSON',object)
			abc.textContent = object.abc
		}
	};
	request.onerror = () => {
		console.log('json 错误');
	};
	request.send();
};

