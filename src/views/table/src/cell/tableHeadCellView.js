// TableHeadCellView
// ---------

import TableCommonCellView from './tableCommonCellView'

const TableHeadCellView = TableCommonCellView.extend({
    render: function () {
        let $link = $('<a href="#">');
        $link.addClass('data-table__sort-btn btn');
        $link.html(this.value);

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html($link);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
});

export default TableHeadCellView;