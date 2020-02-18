(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone.marionette"), require("underscore"), require("backbone"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone.marionette", "underscore", "backbone"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("backbone.marionette"), require("underscore"), require("backbone")) : factory(root["backbone.marionette"], root["underscore"], root["backbone"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("backbone.marionette");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(1);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(0);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TabsOptionView
// ---------

var TabsOptionView = _backbone2.default.ItemView.extend({
    tagName: 'li',
    triggers: {
        'click span': 'tab:clicked'
    },
    attributes: function attributes() {
        return {
            'data-item': this.model.get('index'),
            'class': 'data-tabs__options_item item_' + this.model.get('index')
        };
    },
    template: _underscore2.default.template('<span><%- title %></span>')
});

exports.default = TabsOptionView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = __webpack_require__(4);

var _underscore = __webpack_require__(1);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(5);

var _backbone2 = _interopRequireDefault(_backbone);

var _backbone3 = __webpack_require__(0);

var _backbone4 = _interopRequireDefault(_backbone3);

var _tabsView = __webpack_require__(6);

var _tabsView2 = _interopRequireDefault(_tabsView);

var _tabsOptionView = __webpack_require__(2);

var _tabsOptionView2 = _interopRequireDefault(_tabsOptionView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TabsWidgetView
// ---------

var TabsWidgetView = _backbone4.default.LayoutView.extend({
    version: _version.version,
    events: {},
    regions: {
        tabs_options: '.data-tabs__options_wrapper .data-tabs__options'
    },
    tabs: false,
    tabsView: _tabsView2.default,
    collections: false,
    models: false,
    ui: {
        'items_wrapper': '.data-tabs__content-items_wrapper'
    },
    initialize: function initialize() {
        this.tabs = this.getOption('tabs');
        this.collections = this.getOption('collections');
        this.models = this.getOption('models');
    },
    template: _underscore2.default.template('<div class="data-tabs"><div class="data-tabs__options_wrapper"><div class="data-tabs__options"></div></div></div>' + '<div class="data-tabs__content-items_wrapper"></div>'),
    onRender: function onRender() {
        var that = this;

        var tabsCollection = new _backbone2.default.Collection();

        _underscore2.default.each(this.tabs, function (TabContentView, index) {

            var TabContent = new TabContentView({
                collections: that.collections,
                models: that.models
            });

            tabsCollection.add({
                title: _underscore2.default.result(TabContent, 'title'),
                index: index
            });

            that._renderTabContent(TabContent, index);
        });

        that._renderTabs(tabsCollection);
        this.ui.items_wrapper.find('.data-tabs__content-item').first().addClass('is-active');
    },
    _renderTabs: function _renderTabs(tabsCollection) {
        var Tabs = new this.tabsView({
            collection: tabsCollection
        });
        this.showChildView('tabs_options', Tabs);

        this.listenTo(Tabs, 'tab:clicked', this._onTabClicked);
    },
    _renderTabContent: function _renderTabContent(TabContent, index) {
        var regionName = 'tab-content-item_' + index;
        var tabClassName = 'data-tabs__content-item ' + 'item_' + index;

        var $tabContent = $('<div>');
        $tabContent.addClass(tabClassName);

        this.ui.items_wrapper.append($tabContent);
        this.addRegion(regionName, '.data-tabs__content-item.' + 'item_' + index);

        this.showChildView(regionName, TabContent);
    },
    _onTabClicked: function _onTabClicked(TabView) {
        var itemName = TabView.$el.data('item');

        this.ui.items_wrapper.find('.data-tabs__content-item').removeClass('is-active');

        this.ui.items_wrapper.find('.data-tabs__content-item.item_' + itemName).addClass('is-active');
    }
});

TabsWidgetView.parts = {};
TabsWidgetView.parts.tabsView = _tabsView2.default;
TabsWidgetView.parts.tabsOptionView = _tabsOptionView2.default;

exports.default = TabsWidgetView;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"version":"0.0.2","buildDate":"2017-11-09"}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("backbone");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(0);

var _backbone2 = _interopRequireDefault(_backbone);

var _tabsOptionView = __webpack_require__(2);

var _tabsOptionView2 = _interopRequireDefault(_tabsOptionView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TabsView
// ---------

var TabsView = _backbone2.default.CollectionView.extend({
    tagName: 'ul',
    childView: _tabsOptionView2.default,
    template: false,
    events: {},
    initialize: function initialize() {},
    onRender: function onRender() {
        this.$el.find('>li').first().addClass('is-active');
    },
    onChildviewTabClicked: function onChildviewTabClicked(TabView) {

        this.children.each(function (view) {
            view.$el.removeClass('is-active');
        });

        TabView.$el.addClass('is-active');

        this.triggerMethod('tab:clicked', TabView);
    },
    onBeforeDestroy: function onBeforeDestroy() {}
});

exports.default = TabsView;

/***/ })
/******/ ]);
});
//# sourceMappingURL=tabs.view.js.map