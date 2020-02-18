// TableDateCellView
// ---------

import TableCommonCellView from './tableCommonCellView'

import moment from 'moment';

const TableDateCellView = TableCommonCellView.extend({
    render: function () {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        if(moment.isMoment(this.value)) {
            this.$el.html(this.value.format(this.model._dateFormat));
        }

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
});

export default TableDateCellView;