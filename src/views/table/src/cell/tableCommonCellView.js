// TableCommonCellView
// ---------

import _ from 'underscore';
import Marionette from 'backbone.marionette';

const TableCommonCellView = Marionette.ItemView.extend({
    tagName: 'td',
    template: false,
    model: false,
    initialize: function (attributes) {
        _.extend(this, attributes);
        // this.value = this.getOption('value');
        // this.urlRoot = this.getOption('urlRoot');
    },
    onBeforeDestroy: function () {
        this.cellOptions = false;
    }
});

export default TableCommonCellView;