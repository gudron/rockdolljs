(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone.marionette"), require("remodal"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone.marionette", "remodal"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("backbone.marionette"), require("remodal")) : factory(root["backbone.marionette"], root["remodal"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("backbone.marionette");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = __webpack_require__(2);

var _backbone = __webpack_require__(0);

var _backbone2 = _interopRequireDefault(_backbone);

var _modalContentView = __webpack_require__(3);

var _modalContentView2 = _interopRequireDefault(_modalContentView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalLayoutView = _backbone2.default.LayoutView.extend({
    version: _version.version,
    className: 'modal__wrapper',
    events: {},
    _modalNumber: 0,
    template: false,
    _appLayoutWrapper: false,
    _remodalWrapperClassName: 'remodal-bg remodal-is-opened',
    onRender: function onRender() {},
    initialize: function initialize() {
        this._appLayoutWrapper = App.mainLayoutView.$el.find('.p-wrapper');
    },
    onBeforeAddChild: function onBeforeAddChild(childView) {
        if (!this._appLayoutWrapper.hasClass(this._remodalWrapperClassName)) {
            this._appLayoutWrapper.addClass(this._remodalWrapperClassName);
        }
    },
    onRemoveChild: function onRemoveChild() {
        if (!this._appLayoutWrapper.hasClass(this._remodalWrapperClassName)) {
            this._appLayoutWrapper.removeClass(this._remodalWrapperClassName);
        }
    },
    removeChildView: function removeChildView(view) {
        if (!view) {
            return view;
        }

        this.triggerMethod('before:remove:child', view);

        if (!view.supportsDestroyLifecycle) {
            _backbone2.default.triggerMethodOn(view, 'before:destroy', view);
        }

        var regionName = view.parentRegionName;
        var regionClassName = view.parentRegionClassName;
        // call 'destroy' or 'remove', depending on which is found
        if (view.destroy) {
            view.destroy();
        } else {
            view.remove();
        }

        this.removeRegion(regionName);
        this.$el.find('.' + regionClassName).remove();

        this._modalNumber--;

        if (!view.supportsDestroyLifecycle) {
            _backbone2.default.triggerMethodOn(view, 'destroy', view);
        }

        this.stopListening(view);

        this.triggerMethod('remove:child', view);

        return view;
    },
    addChild: function addChild(child, ChildView) {
        var childViewOptions = this.getOption('childViewOptions');

        var view = this.buildChildView(child, ChildView, childViewOptions);

        // increment indices of views after this one
        this._modalNumber++;

        this.triggerMethod('before:add:child', view);

        this.listenTo(view, 'modal:closed', this.removeChildView);

        this._addChildView(view);
        this.triggerMethod('add:child', view);

        view._parent = this;

        return view;
    },
    _addChildView: function _addChildView(view) {

        var regionName = 'modal-window-' + this._modalNumber;
        var className = 'remodal-window-' + this._modalNumber;

        var $container = $('<div>').addClass(className);

        this.$el.append($container);
        this.addRegion(regionName, '.' + className);
        this.getRegion(regionName).show(view, {
            regionName: regionName,
            regionClassName: className
        });
    },
    buildChildView: function buildChildView(child, ChildViewClass, childViewOptions) {
        var childView = new ChildViewClass(childViewOptions);
        //Marionette.MonitorDOMRefresh(childView);
        return childView;
    }
}); // ModalLayoutView
// ---------

ModalLayoutView.contentView = _modalContentView2.default;

exports.default = ModalLayoutView;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"version":"0.0.6","buildDate":"2017-12-19"}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(0);

var _backbone2 = _interopRequireDefault(_backbone);

var _remodal = __webpack_require__(4);

var _remodal2 = _interopRequireDefault(_remodal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ModalItemView
// ---------

var ModalContentView = _backbone2.default.LayoutView.extend({
    _remodal: false,
    parentRegionName: false,
    parentRegionClassName: false,
    triggers: {
        'click .btn.cancel-btn': {
            event: 'modal:close:click',
            preventDefault: true
        }
    },
    onBeforeShow: function onBeforeShow(view, region, options) {
        this.parentRegionName = options.regionName;
        this.parentRegionClassName = options.regionClassName;
    },
    onAttach: function onAttach() {
        var that = this;
        this._remodal = $(this.$el).remodal();

        this._remodal.$modal.on('closed', function (event) {
            that._onRemodalClosed(event);
            that.trigger('modal:closed', that, event);
        });

        this._remodal.$modal.on('opened', function (event) {
            that._onRemodalOpened(event);
            that.trigger('modal:opened', that, event);
        });

        this._remodal.open();
    },
    onBeforeDestroy: function onBeforeDestroy() {
        if (_.contains(['opened', 'opening'], this._remodal.getState())) {
            this._remodal.close();
        }

        this._remodal.destroy();
        this._remodal = false;
    },
    _onRemodalClosed: function _onRemodalClosed(event) {},
    _onRemodalOpened: function _onRemodalOpened(event) {},
    onModalCloseClick: function onModalCloseClick(event) {
        this._remodal.close();
    }
});

exports.default = ModalContentView;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("remodal");

/***/ })
/******/ ]);
});
//# sourceMappingURL=modal.view.js.map