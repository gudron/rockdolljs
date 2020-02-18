// TableReferenceCellView
// ---------

import TableCommonCellView from './tableCommonCellView';

const TableReferenceCellView = TableCommonCellView.extend({
    attrName: null,
    referenceName: null,
    render: function () {
        let entityId = this.model.attributes[this.attrName];
        let entity = App.references[this.referenceName].get(entityId);
        let entityName = '';

        if(!_.isUndefined(entity) ) {
            entityName = entity.get('t_name');
        }

        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);

        this.$el.html(entityName);

        this.isRendered = true;
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
});

export default TableReferenceCellView;