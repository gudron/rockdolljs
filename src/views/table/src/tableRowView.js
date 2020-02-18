// TableRowView
// ---------

import Marionette from 'backbone.marionette';

import TableCellView from './cell/tableCellView';
import TableLinkCellView from './cell/tableLinkCellView';
import TableCheckboxCellView from './cell/tableCheckboxCellView';
import TableTumblerCellView from './cell/tableTumblerCellView';
import TableActiveStatusCellView from './cell/tableCellActiveStatusView';
import TableDateCellView from './cell/tableDateCellView';

const TableRowView = Marionette.ItemView.extend({
    tagName: 'tr',
    childView: TableCellView,
    template: false,
    childViewOptions: {
        tagName: 'td'
    },
    _cellTypes: {
        link:       TableLinkCellView,
        checkbox:   TableCheckboxCellView,
        tumbler:    TableTumblerCellView,
        text:       TableCellView,
        active:     TableActiveStatusCellView,
        date:       TableDateCellView
    },
    cells: [],
    fields: {},
    initialize: function () {
        this.fields = this.getOption('fields');
        this.template = this.getOption('template');
        this.cells = {};
    },
    modelEvents: {
        "change": "_changed"
    },
    onRender: function () {

        let that = this;
        let id = this.model.get('id');
        if(that.template) {
            var rowContent = that.template(that.model.toJSON());
            that.$el.append(rowContent);
        } else {
            _.each(that.fields, function (field, index) {

                let fieldName = index;

                if(_.contains(_.keys(that._cellTypes), field.type)) {
                    that.childView = that._cellTypes[field.type];
                } else {
                    that.childView = _.isUndefined(field.view) ? TableCellView : field.view;
                }

                let options = _.extend(that.childViewOptions, field, {
                    value: that.model.get(fieldName),
                    rawValue: _.get(that.model.attributes, fieldName),
                    model: that.model
                });

                let view = new that.childView(options);
                view.render();

                _.set(that.cells, fieldName, view);
                that.$el.append(view.$el);
            });
        }

        if(!_.isUndefined(id)) {
            this.$el.attr('data-id', id);
        }
    },
    onBeforeDestroy: function(){
        let that = this;
        if(_.isObject(this.cells)) {
            _.each(that.fields, function (field, fieldName) {
                let view = _.get(that.cells, fieldName);
                if(!_.isUndefined(view)) {
                    view.destroy();
                    _.set(that.cells, field, undefined);
                }
            });
        }
        this.cells = null;
    },
    _changed: function () {
        let that = this;
        let changedAttributes = this.model.changed;
        _.each(changedAttributes, function (value, attr) {

            let view = _.get(that.cells, attr);
            if(!_.isUndefined(view)) {
                view.render();
            }
        });
    }
});

export default TableRowView;