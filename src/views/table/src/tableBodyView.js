// TableBodyView
// ---------

import Marionette from 'backbone.marionette';

import TableRowView from './tableRowView';

const TableBodyView = Marionette.CollectionView.extend({
    tagName: 'tbody',
    className: 'app-table__body',
    childView: TableRowView,
    childViewOptions: {
        template: false,
        fields: false
    },
    bodyViewRowTemplate: false,
    events: {

    },
    fields: {},
    initialize: function () {
        this.fields = this.getOption('fields');
        // The 'childViewOptions' property exists in the prototype
        // That's why firstly we need to add this property for a certain instance
        // to prevent it from getting the prototype's 'childViewOptions'
        // and only then assign to its property 'fields'
        this.childViewOptions = {};
        this.childViewOptions.fields = this.fields;
    }
});

export default TableBodyView;