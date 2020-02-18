// TableCellActiveStatusView
// ---------

import TableReferenceCellView from './tableReferenceCellView';

const TableCellActiveStatusView = TableReferenceCellView.extend({
    attrName: 'active',
    referenceName: 'activeStatuses',
});

export default TableCellActiveStatusView;