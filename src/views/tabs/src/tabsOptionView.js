// TabsOptionView
// ---------

import _ from 'underscore';
import Marionette from 'backbone.marionette';

const TabsOptionView = Marionette.ItemView.extend({
    tagName: 'li',
    triggers: {
        'click span': 'tab:clicked'
    },
    attributes: function () {
        return {
            'data-item' : this.model.get('index'),
            'class': 'data-tabs__options_item item_' + this.model.get('index')
        }
    },
    template: _.template('<span><%- title %></span>')
});

export default TabsOptionView;