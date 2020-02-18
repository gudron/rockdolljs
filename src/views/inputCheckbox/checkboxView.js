// CheckboxView
// ---------

import Marionette from 'backbone.marionette';

const CheckboxView = Marionette.ItemView.extend({
    className: 'checkbox',
    template: _.template('<input id="<%- checkboxId %>" type="checkbox" <% if (is_checked) { %> checked <% } %> >' +
        '<label for="<%- checkboxId %>"><%- label %></label>'),
    attributes: {
        type: 'checkbox',
        checked: false
    },
    events: {
        'change': '_onChange'
    },
    initialize: function (options) {
        this.options = options;
    },
    render: function () {
        this.$el.html(this.template(this.options));
        return this;
    },
    _onChange: function (evt) {
        evt.preventDefault();

        if(!_.isUndefined(this.changeCallback) && _.isFunction(this.changeCallback)) {
            this.changeCallback.call(this, evt);
        }
    }
});

export default CheckboxView;