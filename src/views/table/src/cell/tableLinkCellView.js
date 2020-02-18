// TableLinkCellView
// ---------

import _ from 'underscore';

import TableCommonCellView from './tableCommonCellView'

const TableLinkCellView = TableCommonCellView.extend({
    events: {
        'click a': '_linkClick',
    },
    render: function () {
        var $link = $('<a>')
            .text(this.value)
            .attr('href', this.urlRoot + this.model.get('id'));

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.append($link);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
    _linkClick: function (event) {
        event.preventDefault();

        if(!_.isUndefined(this.clickCallback) && _.isFunction(this.clickCallback)) {
            this.clickCallback.call(this, event);
        } else {
            App.router.navigate(this.urlRoot + this.model.get('id'), {trigger: true});
        }
    },

});

export default TableLinkCellView;