// TableHeadRowView
// ---------

import TableRowView from './tableRowView';

import TableCellView from './cell/tableCellView';
import TableHeadCellView from './cell/tableHeadCellView';

const TableHeadRowView = TableRowView.extend({
    childView: TableHeadCellView,
    _cellTypes: {
        text:       TableCellView,
        head:       TableHeadCellView
    },
});

export default TableHeadRowView;