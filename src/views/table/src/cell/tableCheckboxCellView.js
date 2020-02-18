// TableCheckboxCellView
// ---------

import _ from 'underscore';

import TableCommonCellView from './tableCommonCellView';

const TableCheckboxCellView = TableCommonCellView.extend({
    events: {
        'click .btn.btn--checkbox': '_onClickBtn'
    },
    render: function () {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        var $checkboxBtn = $('<button>')
                .addClass('btn btn--checkbox');

        this.$el.append($checkboxBtn);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
    _onClickBtn: function (evt) {
        var $this = $(evt.target),
            checkedClass = 'is-checked';

        $this.toggleClass(checkedClass)
            .closest('tr').toggleClass(checkedClass);

        evt.preventDefault();

        if(!_.isUndefined(this.clickCallback) && _.isFunction(this.clickCallback)) {
            this.clickCallback.call(this, evt);
        }
    }
});

export default TableCheckboxCellView;