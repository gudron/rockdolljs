(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone.marionette"), require("underscore"), require("backbone"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone.marionette", "underscore", "backbone", "moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("backbone.marionette"), require("underscore"), require("backbone"), require("moment")) : factory(root["backbone.marionette"], root["underscore"], root["backbone"], root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_18__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TableCommonCellView
// ---------

var TableCommonCellView = _backbone2.default.ItemView.extend({
    tagName: 'td',
    template: false,
    model: false,
    initialize: function initialize(attributes) {
        _underscore2.default.extend(this, attributes);
        // this.value = this.getOption('value');
        // this.urlRoot = this.getOption('urlRoot');
    },
    onBeforeDestroy: function onBeforeDestroy() {
        this.cellOptions = false;
    }
});

exports.default = TableCommonCellView;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("backbone.marionette");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _tableCellView = __webpack_require__(4);

var _tableCellView2 = _interopRequireDefault(_tableCellView);

var _tableLinkCellView = __webpack_require__(6);

var _tableLinkCellView2 = _interopRequireDefault(_tableLinkCellView);

var _tableCheckboxCellView = __webpack_require__(14);

var _tableCheckboxCellView2 = _interopRequireDefault(_tableCheckboxCellView);

var _tableTumblerCellView = __webpack_require__(15);

var _tableTumblerCellView2 = _interopRequireDefault(_tableTumblerCellView);

var _tableCellActiveStatusView = __webpack_require__(16);

var _tableCellActiveStatusView2 = _interopRequireDefault(_tableCellActiveStatusView);

var _tableDateCellView = __webpack_require__(17);

var _tableDateCellView2 = _interopRequireDefault(_tableDateCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRowView = _backbone2.default.ItemView.extend({
    tagName: 'tr',
    childView: _tableCellView2.default,
    template: false,
    childViewOptions: {
        tagName: 'td'
    },
    _cellTypes: {
        link: _tableLinkCellView2.default,
        checkbox: _tableCheckboxCellView2.default,
        tumbler: _tableTumblerCellView2.default,
        text: _tableCellView2.default,
        active: _tableCellActiveStatusView2.default,
        date: _tableDateCellView2.default
    },
    cells: [],
    fields: {},
    initialize: function initialize() {
        this.fields = this.getOption('fields');
        this.template = this.getOption('template');
        this.cells = {};
    },
    modelEvents: {
        "change": "_changed"
    },
    onRender: function onRender() {

        var that = this;
        var id = this.model.get('id');
        if (that.template) {
            var rowContent = that.template(that.model.toJSON());
            that.$el.append(rowContent);
        } else {
            _.each(that.fields, function (field, index) {

                var fieldName = index;

                if (_.contains(_.keys(that._cellTypes), field.type)) {
                    that.childView = that._cellTypes[field.type];
                } else {
                    that.childView = _.isUndefined(field.view) ? _tableCellView2.default : field.view;
                }

                var options = _.extend(that.childViewOptions, field, {
                    value: that.model.get(fieldName),
                    rawValue: _.get(that.model.attributes, fieldName),
                    model: that.model
                });

                var view = new that.childView(options);
                view.render();

                _.set(that.cells, fieldName, view);
                that.$el.append(view.$el);
            });
        }

        if (!_.isUndefined(id)) {
            this.$el.attr('data-id', id);
        }
    },
    onBeforeDestroy: function onBeforeDestroy() {
        var that = this;
        if (_.isObject(this.cells)) {
            _.each(that.fields, function (field, fieldName) {
                var view = _.get(that.cells, fieldName);
                if (!_.isUndefined(view)) {
                    view.destroy();
                    _.set(that.cells, field, undefined);
                }
            });
        }
        this.cells = null;
    },
    _changed: function _changed() {
        var that = this;
        var changedAttributes = this.model.changed;
        _.each(changedAttributes, function (value, attr) {

            var view = _.get(that.cells, attr);
            if (!_.isUndefined(view)) {
                view.render();
            }
        });
    }
}); // TableRowView
// ---------

exports.default = TableRowView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableCellView = _tableCommonCellView2.default.extend({
    render: function render() {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html(this.value);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    }
}); // TableCellView
// ---------

exports.default = TableCellView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tableRowView = __webpack_require__(3);

var _tableRowView2 = _interopRequireDefault(_tableRowView);

var _tableCellView = __webpack_require__(4);

var _tableCellView2 = _interopRequireDefault(_tableCellView);

var _tableHeadCellView = __webpack_require__(19);

var _tableHeadCellView2 = _interopRequireDefault(_tableHeadCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeadRowView = _tableRowView2.default.extend({
    childView: _tableHeadCellView2.default,
    _cellTypes: {
        text: _tableCellView2.default,
        head: _tableHeadCellView2.default
    }
}); // TableHeadRowView
// ---------

exports.default = TableHeadRowView;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TableLinkCellView
// ---------

var TableLinkCellView = _tableCommonCellView2.default.extend({
    events: {
        'click a': '_linkClick'
    },
    render: function render() {
        var $link = $('<a>').text(this.value).attr('href', this.urlRoot + this.model.get('id'));

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.append($link);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
    _linkClick: function _linkClick(event) {
        event.preventDefault();

        if (!_underscore2.default.isUndefined(this.clickCallback) && _underscore2.default.isFunction(this.clickCallback)) {
            this.clickCallback.call(this, event);
        } else {
            App.router.navigate(this.urlRoot + this.model.get('id'), { trigger: true });
        }
    }

});

exports.default = TableLinkCellView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableReferenceCellView = _tableCommonCellView2.default.extend({
    attrName: null,
    referenceName: null,
    render: function render() {
        var entityId = this.model.attributes[this.attrName];
        var entity = App.references[this.referenceName].get(entityId);
        var entityName = '';

        if (!_.isUndefined(entity)) {
            entityName = entity.get('t_name');
        }

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html(entityName);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    }
}); // TableReferenceCellView
// ---------

exports.default = TableReferenceCellView;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _tableRowView = __webpack_require__(3);

var _tableRowView2 = _interopRequireDefault(_tableRowView);

var _tableCellView = __webpack_require__(4);

var _tableCellView2 = _interopRequireDefault(_tableCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableFilterView = _backbone2.default.LayoutView.extend({
    tagName: 'tr',
    template: _.template('<th colspan="<%- th_colspan %>"><div class="app-table-filter"><div class="row"></div></div></th>'),
    attributes: {},
    cells: [],
    fields: {},
    initialize: function initialize() {
        this.fields = this.getOption('fields');
        this.filters = this.getOption('filters');
    },
    render: function render() {

        this.$el.html(this.template({
            th_colspan: _.size(this.fields)
        }));
        return this;
    }
}); // TableFilterView
// ---------

exports.default = TableFilterView;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = __webpack_require__(11);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(12);

var _backbone2 = _interopRequireDefault(_backbone);

var _backbone3 = __webpack_require__(1);

var _backbone4 = _interopRequireDefault(_backbone3);

var _tableHeadView = __webpack_require__(13);

var _tableHeadView2 = _interopRequireDefault(_tableHeadView);

var _tableFilterView = __webpack_require__(8);

var _tableFilterView2 = _interopRequireDefault(_tableFilterView);

var _tableBodyView = __webpack_require__(20);

var _tableBodyView2 = _interopRequireDefault(_tableBodyView);

var _tableFooterView = __webpack_require__(21);

var _tableFooterView2 = _interopRequireDefault(_tableFooterView);

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

var _tableCellView = __webpack_require__(4);

var _tableCellView2 = _interopRequireDefault(_tableCellView);

var _tableReferenceCellView = __webpack_require__(7);

var _tableReferenceCellView2 = _interopRequireDefault(_tableReferenceCellView);

var _tableLinkCellView = __webpack_require__(6);

var _tableLinkCellView2 = _interopRequireDefault(_tableLinkCellView);

var _tableRowView = __webpack_require__(3);

var _tableRowView2 = _interopRequireDefault(_tableRowView);

var _tableHeadRowView = __webpack_require__(5);

var _tableHeadRowView2 = _interopRequireDefault(_tableHeadRowView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Table rows


// Table cells


// Table layouts
// TableView
// ---------

var TableView = _backbone4.default.LayoutView.extend({
    version: _version.version,
    tagName: 'table',
    className: 'app-table',
    template: false,
    labels: false,
    collection: null,
    initialize: function initialize() {
        var labels = this.getOption('labels');
        if (labels) {
            this.labels = labels;
        }

        if (_underscore2.default.isFunction(this.labels)) {
            this.labels = this.labels.call(this);
        }

        this.collection = this.getOption('collection');

        if (this.getOption('footerView')) {
            this._footerView = this.getOption('footerView');
        }

        if (_underscore2.default.isEmpty(this.fields) && !_underscore2.default.isFunction(this.fields)) {
            this.fields = _underscore2.default.result(this.options, 'fields');
        } else {
            this.fields = _underscore2.default.result(this, 'fields');
        }

        this.listenTo(this.labels, 'fetch:success', this._renderHeader);
        this.listenTo(this.collection, 'fetch:success', this._renderFooter);

        this.headerView = new this._headerView({
            fields: this.fields,
            filters: this.getOption('filters')
        });

        this.footerView = new this._footerView({
            fields: this.fields,
            collection: this.collection
        });
    },
    filterView: false,
    headerView: false,
    _headerView: _tableHeadView2.default,
    bodyView: false,
    bodyViewRowTemplate: false,
    footerView: false,
    _footerView: _tableFooterView2.default,
    hiddenAttributes: {},
    fields: {},
    onRender: function onRender() {

        var that = this;

        this.bodyView = new _tableBodyView2.default({
            collection: that.collection,
            fields: that.fields,
            bodyViewRowTemplate: that.bodyViewRowTemplate
        });

        if (!_underscore2.default.isNull(this.labels) && !this.labels.isEmpty()) {
            this._renderHeader();
        }

        this.bodyView.render();

        this.$el.append(this.headerView.$el).append(this.bodyView.$el).append(this.footerView.$el);
    },
    _renderParts: function _renderParts(resp) {
        this._renderHeader(resp);
        this._renderFooter(resp);
    },
    _renderHeader: function _renderHeader(resp) {
        this.headerView.collection = new _backbone2.default.Collection([this.labels]);
        this.headerView.render();
    },
    _renderFooter: function _renderFooter(resp) {
        this.footerView.render();
    },
    onBeforeDestroy: function onBeforeDestroy() {
        this.headerView.destroy();
        this.bodyView.destroy();
        this.footerView.destroy();

        this.collection.reset(null);
        this.labels.clear({ silent: true });
    }
});

TableView.cells = {};
TableView.cells.tableCommonCellView = _tableCommonCellView2.default;
TableView.cells.tableCellView = _tableCellView2.default;
TableView.cells.tableReferenceCellView = _tableReferenceCellView2.default;
TableView.cells.tableLinkCellView = _tableLinkCellView2.default;

TableView.layouts = {};
TableView.layouts.headView = _tableHeadView2.default;
TableView.layouts.filterView = _tableFilterView2.default;
TableView.layouts.bodyView = _tableBodyView2.default;
TableView.layouts.footerView = _tableFooterView2.default;

TableView.rows = {};
TableView.rows.rowView = _tableRowView2.default;
TableView.rows.headRowView = _tableHeadRowView2.default;

exports.default = TableView;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"version":"0.0.4","buildDate":"2017-11-09"}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("backbone");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _tableHeadRowView = __webpack_require__(5);

var _tableHeadRowView2 = _interopRequireDefault(_tableHeadRowView);

var _tableFilterView = __webpack_require__(8);

var _tableFilterView2 = _interopRequireDefault(_tableFilterView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeadView = _backbone2.default.CollectionView.extend({
    tagName: 'thead',
    className: 'app-table__header',
    childView: _tableHeadRowView2.default,
    childViewOptions: {
        tagName: 'tr',
        template: false,
        fields: false
    },
    template: false,
    events: {},
    fields: {},
    filter: {},
    collection: false,
    _defaultFieldType: 'head',
    initialize: function initialize() {
        var that = this;
        var fieldsClone = $.extend(true, {}, this.getOption('fields')); // TODO: Dirty hack. need refactor it
        var filterClone = $.extend(true, {}, this.getOption('filters')); // TODO: Dirty hack. need refactor it
        this.fields = fieldsClone;
        this.filters = filterClone;
        //this.collection = this.getOption('collection');
        // The 'childViewOptions' property exists in the prototype
        // That's why firstly we need to add this property for a certain instance
        // to prevent it from getting the prototype's 'childViewOptions'
        // and only then assign to its property 'fields'
        this.childViewOptions = {};
        this.childViewOptions.fields = this.fields;

        _.each(this.childViewOptions.fields, function (field, index) {
            field.type = that._defaultFieldType;
        });
    },
    render: function render() {
        var that = this;

        _backbone2.default.CollectionView.prototype.render.call(this);

        if (!_.isEmpty(this.filters)) {
            var filterView = new _tableFilterView2.default({
                fields: that.fields,
                filters: that.filters
            });
            filterView.render();
            that.$el.prepend(filterView.$el);
        }
    },
    onBeforeAddChild: function onBeforeAddChild(childView) {
        childView.childViewOptions = {
            tagName: 'th'
        };
    },
    onBeforeDestroy: function onBeforeDestroy() {
        this.fields = null;
        if (!_.isUndefined(this.collection)) {
            this.collection.reset(null);
        }
    }
}); // TableHeadView
// ---------

exports.default = TableHeadView;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TableCheckboxCellView
// ---------

var TableCheckboxCellView = _tableCommonCellView2.default.extend({
    events: {
        'click .btn.btn--checkbox': '_onClickBtn'
    },
    render: function render() {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        var $checkboxBtn = $('<button>').addClass('btn btn--checkbox');

        this.$el.append($checkboxBtn);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
    _onClickBtn: function _onClickBtn(evt) {
        var $this = $(evt.target),
            checkedClass = 'is-checked';

        $this.toggleClass(checkedClass).closest('tr').toggleClass(checkedClass);

        evt.preventDefault();

        if (!_underscore2.default.isUndefined(this.clickCallback) && _underscore2.default.isFunction(this.clickCallback)) {
            this.clickCallback.call(this, evt);
        }
    }
});

exports.default = TableCheckboxCellView;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TableTumblerCellView
// ---------

var TableTumblerCellView = _tableCommonCellView2.default.extend({
    ui: {
        tumbler: '.tumbler'
    },
    events: {
        'click @ui.tumbler': '_onChangeTumbler'
    },
    template: _underscore2.default.template('<input class="tumbler" id="table-cell-tumbler-<%- id_suffix %>" data-cid="<%- id_suffix %>" type="checkbox" <% if (is_checked) { %> checked <% } %> >' + '<label for="table-cell-tumbler-<%- id_suffix %>" data-value-off="<%- t_global__tumbler_off_title %>" data-value-on="<%- t_global__tumbler_on_title %>"><span></span></label>'),
    render: function render() {
        var that = this;

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html(this.template({
            t_global__tumbler_off_title: App.t('global.tumbler_off_title'),
            t_global__tumbler_on_title: App.t('global.tumbler_on_title'),
            id_suffix: that.options.model.cid,
            is_checked: that.value
        }));

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
    _toggleTumblerClass: function _toggleTumblerClass($tumbler, is_checked) {
        var isOnClass = 'is-on',
            isOffClass = 'is-off';

        if (is_checked) {
            $tumbler.removeClass(isOffClass).addClass(isOnClass);
        } else {
            $tumbler.removeClass(isOnClass).addClass(isOffClass);
        }
    },
    _onChangeTumbler: function _onChangeTumbler(evt) {
        var $this = $(evt.target);

        this._toggleTumblerClass($this, $this.prop('checked'));

        if (!_underscore2.default.isUndefined(this.clickCallback) && _underscore2.default.isFunction(this.clickCallback)) {
            this.clickCallback.call(this, evt);
        }
    }
});
exports.default = TableTumblerCellView;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tableReferenceCellView = __webpack_require__(7);

var _tableReferenceCellView2 = _interopRequireDefault(_tableReferenceCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableCellActiveStatusView = _tableReferenceCellView2.default.extend({
    attrName: 'active',
    referenceName: 'activeStatuses'
}); // TableCellActiveStatusView
// ---------

exports.default = TableCellActiveStatusView;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

var _moment = __webpack_require__(18);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TableDateCellView
// ---------

var TableDateCellView = _tableCommonCellView2.default.extend({
    render: function render() {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        if (_moment2.default.isMoment(this.value)) {
            this.$el.html(this.value.format(this.model._dateFormat));
        }

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    }
});

exports.default = TableDateCellView;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tableCommonCellView = __webpack_require__(0);

var _tableCommonCellView2 = _interopRequireDefault(_tableCommonCellView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeadCellView = _tableCommonCellView2.default.extend({
    render: function render() {
        var $link = $('<a href="#">');
        $link.addClass('data-table__sort-btn btn');
        $link.html(this.value);

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html($link);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    }
}); // TableHeadCellView
// ---------

exports.default = TableHeadCellView;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _tableRowView = __webpack_require__(3);

var _tableRowView2 = _interopRequireDefault(_tableRowView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TableBodyView
// ---------

var TableBodyView = _backbone2.default.CollectionView.extend({
    tagName: 'tbody',
    className: 'app-table__body',
    childView: _tableRowView2.default,
    childViewOptions: {
        template: false,
        fields: false
    },
    bodyViewRowTemplate: false,
    events: {},
    fields: {},
    initialize: function initialize() {
        this.fields = this.getOption('fields');
        // The 'childViewOptions' property exists in the prototype
        // That's why firstly we need to add this property for a certain instance
        // to prevent it from getting the prototype's 'childViewOptions'
        // and only then assign to its property 'fields'
        this.childViewOptions = {};
        this.childViewOptions.fields = this.fields;
    }
});

exports.default = TableBodyView;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableFooterView = _backbone2.default.ItemView.extend({
    tagName: 'tfoot',
    className: 'app-table__footer',
    template: _.template('<tr><td colspan="<%- td_colspan %>"><%- empty_result_text %></td></tr>'),
    events: {},
    initialize: function initialize() {},
    render: function render() {
        var that = this;

        if (_.size(this.getOption('collection')) == 0) {
            this.$el.html(this.template({
                td_colspan: _.size(this.getOption('fields')),
                empty_result_text: App.t('global.table_view_no_result')
            }));
        } else {
            this.$el.empty();
        }
    },
    onBeforeDestroy: function onBeforeDestroy() {}
}); // TableFooterView
// ---------

exports.default = TableFooterView;

/***/ })
/******/ ]);
});
//# sourceMappingURL=table.view.js.map