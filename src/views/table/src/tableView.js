// TableView
// ---------

import {version} from '../version.json';

import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

// Table layouts
import TableHeadView from './tableHeadView';
import TableFilterView from './tableFilterView';
import TableBodyView from './tableBodyView';
import TableFooterView from './tableFooterView';

// Table cells
import TableCommonCellView from './cell/tableCommonCellView';
import TableCellView from './cell/tableCellView';
import TableReferenceCellView from './cell/tableReferenceCellView';
import TableLinkCellView from './cell/tableLinkCellView';

// Table rows
import TableRowView from './tableRowView';
import TableHeadRowView from './tableHeadRowView';

const TableView = Marionette.LayoutView.extend({
    version: version,
    tagName: 'table',
    className: 'app-table',
    template: false,
    labels: false,
    collection: null,
    initialize: function () {
        let labels = this.getOption('labels');
        if(labels) {
            this.labels = labels;
        }

        if(_.isFunction(this.labels)) {
            this.labels = this.labels.call(this);
        }

        this.collection = this.getOption('collection');

        if(this.getOption('footerView') ) {
            this._footerView = this.getOption('footerView');
        }

        if(_.isEmpty(this.fields) && !_.isFunction(this.fields)) {
            this.fields = _.result(this.options, 'fields');
        } else {
            this.fields = _.result(this, 'fields');
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
    _headerView: TableHeadView,
    bodyView: false,
    bodyViewRowTemplate: false,
    footerView: false,
    _footerView: TableFooterView,
    hiddenAttributes: {

    },
    fields: {},
    onRender: function () {

        var that = this;

        this.bodyView = new TableBodyView({
            collection: that.collection,
            fields: that.fields,
            bodyViewRowTemplate: that.bodyViewRowTemplate
        });

        if(!_.isNull(this.labels)  && !this.labels.isEmpty() ) {
            this._renderHeader();
        }

        this.bodyView.render();

        this.$el
            .append(this.headerView.$el)
            .append(this.bodyView.$el)
            .append(this.footerView.$el);

    },
    _renderParts: function (resp) {
        this._renderHeader(resp);
        this._renderFooter(resp);
    },
    _renderHeader: function (resp) {
        this.headerView.collection = new Backbone.Collection( [this.labels] );
        this.headerView.render();
    },
    _renderFooter: function (resp) {
        this.footerView.render();
    },
    onBeforeDestroy: function () {
        this.headerView.destroy();
        this.bodyView.destroy();
        this.footerView.destroy();

        this.collection.reset(null);
        this.labels.clear({silent: true});
    }
});


TableView.cells = {};
TableView.cells.tableCommonCellView = TableCommonCellView;
TableView.cells.tableCellView = TableCellView;
TableView.cells.tableReferenceCellView = TableReferenceCellView;
TableView.cells.tableLinkCellView = TableLinkCellView;

TableView.layouts = {};
TableView.layouts.headView = TableHeadView;
TableView.layouts.filterView = TableFilterView;
TableView.layouts.bodyView = TableBodyView;
TableView.layouts.footerView = TableFooterView;

TableView.rows = {};
TableView.rows.rowView = TableRowView;
TableView.rows.headRowView = TableHeadRowView;

export default TableView;