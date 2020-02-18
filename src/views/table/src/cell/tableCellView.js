// TableCellView
// ---------

import TableCommonCellView from './tableCommonCellView';

const TableCellView = TableCommonCellView.extend({
    render: function () {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html(this.value);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
});

export default TableCellView;
