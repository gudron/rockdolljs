// TableFooterView
// ---------

import Marionette from 'backbone.marionette';

const TableFooterView = Marionette.ItemView.extend({
    tagName: 'tfoot',
    className: 'app-table__footer',
    template: _.template('<tr><td colspan="<%- td_colspan %>"><%- empty_result_text %></td></tr>'),
    events: {

    },
    initialize: function () {

    },
    render: function () {
        let that = this;

        if(_.size(this.getOption('collection')) == 0 ) {
            this.$el.html(this.template({
                td_colspan: _.size(this.getOption('fields')),
                empty_result_text: App.t('global.table_view_no_result')
            }))
        } else {
            this.$el.empty();
        }
    },
    onBeforeDestroy: function () {

    }
});

export default TableFooterView;