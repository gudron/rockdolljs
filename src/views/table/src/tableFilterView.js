// TableFilterView
// ---------

import Marionette from 'backbone.marionette';

import TableRowView from './tableRowView';

import TableCellView from './cell/tableCellView';

const TableFilterView = Marionette.LayoutView.extend({
    tagName: 'tr',
    template: _.template('<th colspan="<%- th_colspan %>"><div class="app-table-filter"><div class="row"></div></div></th>'),
    attributes: {},
    cells: [],
    fields: {},
    initialize: function () {
        this.fields = this.getOption('fields');
        this.filters = this.getOption('filters');
    },
    render: function () {

        this.$el.html(this.template({
            th_colspan: _.size(this.fields)
        }));
        return this;
    }
});

export default TableFilterView;