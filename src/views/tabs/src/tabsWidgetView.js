// TabsWidgetView
// ---------

import {version} from '../version.json';

import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import TabsView from './tabsView';
import TabsOptionView from './tabsOptionView';

const TabsWidgetView = Marionette.LayoutView.extend({
    version: version,
    events: {},
    regions: {
        tabs_options: '.data-tabs__options_wrapper .data-tabs__options',
    },
    tabs: false,
    tabsView: TabsView,
    collections: false,
    models: false,
    ui: {
        'items_wrapper': '.data-tabs__content-items_wrapper'
    },
    initialize: function () {
        this.tabs = this.getOption('tabs');
        this.collections = this.getOption('collections');
        this.models = this.getOption('models');
    },
    template: _.template('<div class="data-tabs"><div class="data-tabs__options_wrapper"><div class="data-tabs__options"></div></div></div>' +
        '<div class="data-tabs__content-items_wrapper"></div>'),
    onRender: function () {
        let that = this;

        var tabsCollection = new Backbone.Collection();

        _.each(this.tabs, function (TabContentView, index) {

            let TabContent = new TabContentView({
                collections: that.collections,
                models: that.models
            });

            tabsCollection.add({
                title: _.result(TabContent, 'title'),
                index: index
            });

            that._renderTabContent(TabContent, index);
        });

        that._renderTabs(tabsCollection);
        this.ui.items_wrapper.find('.data-tabs__content-item')
            .first().addClass('is-active');
    },
    _renderTabs: function (tabsCollection) {
        let Tabs = new this.tabsView({
            collection: tabsCollection
        });
        this.showChildView('tabs_options', Tabs);

        this.listenTo(Tabs, 'tab:clicked', this._onTabClicked);
    },
    _renderTabContent: function (TabContent, index) {
        let regionName = 'tab-content-item_' + index;
        let tabClassName = 'data-tabs__content-item ' + 'item_' + index;

        let $tabContent = $('<div>');
        $tabContent.addClass(tabClassName);

        this.ui.items_wrapper.append($tabContent);
        this.addRegion(regionName, '.data-tabs__content-item.' + 'item_' + index);

        this.showChildView(regionName, TabContent);
    },
    _onTabClicked: function (TabView) {
        let itemName = TabView.$el.data('item');

        this.ui.items_wrapper.find('.data-tabs__content-item')
            .removeClass('is-active');

        this.ui.items_wrapper.find('.data-tabs__content-item.item_' + itemName)
            .addClass('is-active');
    },
});

TabsWidgetView.parts = {};
TabsWidgetView.parts.tabsView = TabsView;
TabsWidgetView.parts.tabsOptionView = TabsOptionView;

export default TabsWidgetView;