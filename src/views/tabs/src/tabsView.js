// TabsView
// ---------

import Marionette from 'backbone.marionette';

import TabsOptionView from './tabsOptionView';

const TabsView = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: TabsOptionView,
    template: false,
    events: {

    },
    initialize: function () {

    },
    onRender: function() {
        this.$el.find('>li')
            .first().addClass('is-active');
    },
    onChildviewTabClicked: function (TabView) {

        this.children.each(function (view) {
            view.$el.removeClass('is-active');
        });

        TabView.$el.addClass('is-active');

        this.triggerMethod('tab:clicked', TabView)
    },
    onBeforeDestroy: function () {

    }
});

export default TabsView;