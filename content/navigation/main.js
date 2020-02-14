const $add = $('#addNav');
const website = localStorage.getItem('website');
const websiteObj = JSON.parse(website);
let hashMap = websiteObj || [
	{logo: 'Q', url: 'qq.com'},
	{logo: 'T', url: 'taobao.com'},
	{logo: 'G', url: 'github.com'},
	{logo: 'E', url: 'ele.me'},
	{logo: 'B', url: 'https://www.bilibili.com'},
];
const simplifyURL = (url) => {
	return url.replace('https://', '').replace('http://', '').replace('www.', '')
		.replace(/\/.*/, '')
};
const cacheAddDel = function () {
	const string = JSON.stringify(hashMap);
	localStorage.setItem('website', string);
	parent.location.reload()
};
const render = () => {
	hashMap.forEach((node,index) => {
		const $nav = $(`<div class="nav jump">
			<div class="symbol">${node.logo}</div>
			<div class="name">${simplifyURL(node.url)}</div>
			<div class="delNav">
				<svg class="icon">
					<use xlink:href="#icon-delete"></use>
				</svg>
			</div>
		</div>`).insertBefore($add);
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
	// console.log(currentURL)
	window.open('http://' + currentURL)
});

$add.on('click', () => {
	let url = window.prompt('输入您要添加的站点：');
	hashMap.push({
		logo: simplifyURL(url)[0].toUpperCase(),
		url: url
	});
	cacheAddDel()
});