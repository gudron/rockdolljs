// TableTumblerCellView
// ---------

import _ from 'underscore';

import TableCommonCellView from './tableCommonCellView';

const TableTumblerCellView = TableCommonCellView.extend({
    ui: {
      tumbler: '.tumbler'
    },
    events: {
        'click @ui.tumbler': '_onChangeTumbler'
    },
    template: _.template(
        '<input class="tumbler" id="table-cell-tumbler-<%- id_suffix %>" data-cid="<%- id_suffix %>" type="checkbox" <% if (is_checked) { %> checked <% } %> >' +
            '<label for="table-cell-tumbler-<%- id_suffix %>" data-value-off="<%- t_global__tumbler_off_title %>" data-value-on="<%- t_global__tumbler_on_title %>"><span></span></label>'
    ),
    render: function () {
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
    _toggleTumblerClass: function ($tumbler, is_checked) {
        var isOnClass = 'is-on',
            isOffClass = 'is-off';

        if (is_checked) {
            $tumbler.removeClass(isOffClass).addClass(isOnClass);
        } else {
            $tumbler.removeClass(isOnClass).addClass(isOffClass);
        }
    },
    _onChangeTumbler: function (evt) {
        var $this = $(evt.target);

        this._toggleTumblerClass($this, $this.prop('checked'));

        if(!_.isUndefined(this.clickCallback) && _.isFunction(this.clickCallback)) {
            this.clickCallback.call(this, evt);
        }
    }
});
export default TableTumblerCellView;