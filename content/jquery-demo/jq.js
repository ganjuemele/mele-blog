window.$ = window.jQuery;
jQuery = function (selectorOrArrOrtemplate) {
	let elements;
	if (typeof selectorOrArrOrtemplate === 'string') {
		if (selectorOrArrOrtemplate[0] === '<') {
			//创建标签
			elements = [createElement(selectorOrArrOrtemplate)]
		} else {
			//查找 标签
			elements = document.querySelectorAll(selectorOrArrOrtemplate)
		}
	} else if (selectorOrArrOrtemplate instanceof Array) {
		elements = selectorOrArrOrtemplate
	}

	function createElement(string) {
		const container = document.createElement('template');
		container.innerHTML = string.trim();
		return container.content.firstChild;
	}

	const api = Object.create(jQuery.prototype);
	// const api = {__proto__: jQuery.prototype};
	Object.assign(api, {
		elements: elements,
		oldApi: selectorOrArrOrtemplate.oldApi
	});
	return api;
};
jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	jQuery: true,
	get(index) {
		return this.elements[index];
	},
	appendTo(node) {
		if (node instanceof Element) {
			this.each(el => node.appendChild(el));
		} else if (node.jquery === true) {
			this.each(el => node.get(0).appendChild(el))
		}
	},
	append(children) {
		if (children instanceof Element) {
			this.get(0).appendChild(children)
		} else if (children instanceof HTMLCollection) {
			for (let i = 0; i < children.length; i++) {
				this.get(0).appendChild(children[i]);
			}
		} else if (children.jquery === true) {
			children.each(node => this.get(0).appendChild(node));
		}
	},
	find(selector) {
		let array = [];
		for (let i = 0; i < this.elements.length; i++) {
			const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
			array = array.concat(this.elements2);
		}
		array.oldApi = this; // this 就是 旧 api
		return jQuery(array);
	},
	each(fn) {
		for (let i = 0; i < this.elements.length; i++) {
			fn.call(null, this.elements[i], i);
		}
		return this;
	},
	parent() {
		const array = [];
		this.each(node => {
			if (array.indexOf(node.parentNode) === -1) {
				array.push(node.parentNode);
			}
		});
		return jQuery(array);
	},
	children() {
		const array = [];
		this.each(node => {
			if (array.indexOf(node.parentNode) === -1) {
				array.push(...node.children);
			}
		});
		return jQuery(array);
	},
	print() {
		console.log(this.elements);
	},
	// 闭包：函数访问外部的变量
	addClass(className) {
		for (let i = 0; i < this.elements.length; i++) {
			const element = this.elements[i];
			element.classList.add(className);
		}
		return this;
	},
	end() {
		return this.oldApi; // this 就是新 api
	}
}