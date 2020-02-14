// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $add = $('#addNav');
var website = localStorage.getItem('website');
var websiteObj = JSON.parse(website);
var hashMap = websiteObj || [{
  logo: 'Q',
  url: 'qq.com'
}, {
  logo: 'T',
  url: 'taobao.com'
}, {
  logo: 'G',
  url: 'github.com'
}, {
  logo: 'E',
  url: 'ele.me'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}];

var simplifyURL = function simplifyURL(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var cacheAddDel = function cacheAddDel() {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('website', string);
  parent.location.reload();
};

var render = function render() {
  hashMap.forEach(function (node, index) {
    var $nav = $("<div class=\"nav jump\">\n\t\t\t<div class=\"symbol\">".concat(node.logo, "</div>\n\t\t\t<div class=\"name\">").concat(simplifyURL(node.url), "</div>\n\t\t\t<div class=\"delNav\">\n\t\t\t\t<svg class=\"icon\">\n\t\t\t\t\t<use xlink:href=\"#icon-delete\"></use>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t</div>")).insertBefore($add);
    $nav.on('click', '.delNav', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1);
      cacheAddDel();
    });
  });
};

render();
$('.jump').on('click', function (e) {
  var currentURL = e.currentTarget.children[1].innerText; // console.log(currentURL)

  window.open('http://' + currentURL);
});
$add.on('click', function () {
  var url = window.prompt('输入您要添加的站点：');
  hashMap.push({
    logo: simplifyURL(url)[0].toUpperCase(),
    url: url
  });
  cacheAddDel();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=/main.c0f52ca2.js.map