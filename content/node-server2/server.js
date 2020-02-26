var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];
if (!port) {
	console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
	process.exit(1)
}
var server = http.createServer(function (request, response) {
	let parsedUrl = url.parse(request.url, true);
	let pathWithQuery = request.url;
	let queryString = '';
	if (pathWithQuery.indexOf('?') >= 0) {
		queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
	}
	let path = parsedUrl.pathname;
	// let query = parsedUrl.query;
	let method = request.method;

	/******** 从这里开始看，上面不要看 ************/
	console.log('有人发请求啦！路径（带查询参数）为：' + pathWithQuery);

	if (path === "/sign_in" && method === "POST") {
		// response.setHeader('Content-Type', 'text/html;charset=utf-8');
		const userArray = JSON.parse(fs.readFileSync('./db/users.json'));
		const array = [];
		request.on("data", (chunk) => {
			array.push(chunk)
		});
		request.on("end", () => {
			const string = Buffer.concat(array).toString();
			const obj = JSON.parse(string);
			const user = userArray.find((user) => user.name === obj.name && user.password === obj.password);
			if (user === undefined) {
				response.statusCode = 400;
				response.setHeader("Content-Type","text/json;charser=utf-8")
				response.end('用户名密码不匹配')
				// response.end(`{"errorCode": 错误码21414}`)
			} else {
				response.statusCode = 200;
				response.setHeader('Set-Cookie', `user_id=${user.id};HttpOnly`)
				response.end()
			}
		})
	} else if (path === "./home.html") {
		const cookie = request.headers['cookie'];
		let userId;
		try{
			userId = cookie
				.split(';')
				.filter(s => s.indexOf('user_id=') >= 0)[0]
				.split('=')[1];
		} catch (error) {}
		if (userId) {
			const userArray = JSON.parse(fs.readFileSync("./db/users.json"))
			const user = userArray.find(user => user.id.toString() === userId)
			const homeHtml = fs.readFileSync("./public/home.html").toString();
			let string
			if (user) {
				string = homeHtml.replace('{{loginStatus}}','已登录')
					.replace('{{user.name}}', user.name)
			} else {
				// string = homeHtml.replace('{{loginStatus}}','未登录')
				// 	.replace('{{user.name}}', '')
			}
			response.write(string)
		} else {
			const homeHtml = fs.readFileSync("./public/home.html").toString();
			const string = homeHtml.replace('{{loginStatus}}','未登录')
				.replace('{{user.name}}', '')
			response.write(string)
		}
		response.end()
	} else if (path === "/register" && method === "POST") {
		response.setHeader('Content-Type', 'text/html;charset=utf-8');
		const userArray = JSON.parse(fs.readFileSync('./db/users.json'));
		const array = [];
		request.on("data", chunk => {
			array.push(chunk)
		});
		request.on("end", () => {
			const string = Buffer.concat(array).toString();
			const obj = JSON.parse(string);
			const lastUser = userArray[userArray.length - 1];
			const newUser = {
				id: lastUser ? lastUser.id + 1 : 1,
				name: obj.name,
				password: obj.password
			};
			userArray.push(newUser);
			fs.writeFileSync('./db/users.json', JSON.stringify(userArray))
			response.end()
		});
	} else {
		response.statusCode = 200;
		const filePath = path === '/' ? '/index.html' : path;
		const index = filePath.lastIndexOf('.');
		const suffix = filePath.substring(index);
		const fileTypes = {
			'.html': 'text/html',
			'.css': 'text/css',
			'.js': 'text/javascript',
			'.png': 'text/png',
			'.jpg': 'text/jpeg',
		};
		response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`);
		let content;
		try {
			content = fs.readFileSync(`./public${filePath}`);
		} catch (error) {
			content = '你输入的路径不存在对应的内容';
			response.statusCode = 404;
		}
		response.write(content);
		response.end();
	}

	/******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port);


