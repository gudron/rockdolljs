// TableHeadView
// ---------

import Marionette from 'backbone.marionette';

import TableHeadRowView from './tableHeadRowView';
import TableFilterView from './tableFilterView';

const TableHeadView = Marionette.CollectionView.extend({
    tagName: 'thead',
    className: 'app-table__header',
    childView: TableHeadRowView,
    childViewOptions: {
        tagName: 'tr',
        template: false,
        fields: false
    },
    template: false,
    events: {

    },
    fields: {},
    filter: {},
    collection: false,
    _defaultFieldType: 'head',
    initialize: function () {
        let that = this;
        var fieldsClone = $.extend(true, {}, this.getOption('fields')); // TODO: Dirty hack. need refactor it
        var filterClone = $.extend(true, {}, this.getOption('filters')); // TODO: Dirty hack. need refactor it
        this.fields = fieldsClone;
        this.filters = filterClone;
        //this.collection = this.getOption('collection');
        // The 'childViewOptions' property exists in the prototype
        // That's why firstly we need to add this property for a certain instance
        // to prevent it from getting the prototype's 'childViewOptions'
        // and only then assign to its property 'fields'
        this.childViewOptions = {};
        this.childViewOptions.fields = this.fields;

        _.each(this.childViewOptions.fields, function (field, index) {
            field.type = that._defaultFieldType;
        });
    },
    render: function () {
        let that = this;

        Marionette.CollectionView.prototype.render.call(this);

        if(!_.isEmpty(this.filters)) {
            var filterView = new TableFilterView({
                fields: that.fields,
                filters: that.filters
            });
            filterView.render();
            that.$el.prepend(filterView.$el);
        }
    },
    onBeforeAddChild: function(childView) {
        childView.childViewOptions = {
            tagName: 'th'
        }
    },
    onBeforeDestroy: function () {
        this.fields = null;
        if(!_.isUndefined(this.collection)) {
            this.collection.reset(null);
        }
    }
});

export default TableHeadView;