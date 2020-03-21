const $add = $('#addNav');
const website = localStorage.getItem('website');
const websiteObj = JSON.parse(website);
let hashMap = websiteObj || [
	{logo: 'Q', url: 'qq.com', urlName:'QQ'},
	{logo: 'T', url: 'taobao.com', urlName:'淘宝'},
	{logo: 'G', url: 'github.com', urlName:'github'},
	{logo: 'E', url: 'ele.me', urlName:'饿了么'},
	{logo: 'B', url: 'bilibili.com', urlName:'B站'},
	{logo: 'G', url: 'google.com', urlName:'谷歌'},

];
const simplifyURL = (url) => {
	return url.replace('https://', '').replace('http://', '').replace('www.', '')
		.replace(/\/.*/, '').replace(/\.w*$/,'')
};
const cacheAddDel = function () {
	const string = JSON.stringify(hashMap);
	localStorage.setItem('website', string);
	parent.location.reload()
};
const render = (newChild, refChild) => {
	hashMap.forEach((node,index) => {
		const $nav = $(`<div class="nav jump">
			<div class="symbol">${node.logo}</div>
			<div style="display: none">${simplifyURL(node.url)}</div>
			<div class="name">${node.urlName || simplifyURL(node.url)}</div>
			<div class="delNav">
				<svg class="icon">
					<use xlink:href="#icon-delete"></use>
				</svg>
			</div>
		</div>`).insertBefore($add, refChild);
		$nav.on('click','.delNav',(e)=> {
			e.stopPropagation(); //阻止冒泡
			hashMap.splice(index,1);
			cacheAddDel()
		})
	});
};
render();

$('.jump').on('click', function (e) {
	const currentURL = e.currentTarget.children[1].innerText;
	window.open('http://'+currentURL)
});

$add.on('click', () => {
	const url = window.prompt('输入您要添加的站点：');
	const urlName = window.prompt('输入站点名称：');
	hashMap.push({
		urlName: urlName,
		logo: (urlName)[0].toUpperCase() || simplifyURL(url)[0].toUpperCase(),
		url: url
	});
	cacheAddDel()
});