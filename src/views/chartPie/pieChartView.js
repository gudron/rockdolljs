// PieChartView
// ---------

import ChartView from './basicChartView';

import PieChart from './charts/pieChart'
import Filter from './filters/commonFilter'

const PieChartView = ChartView.extend({
    model: false,
    filterView: Filter,
    chartView: PieChart,
});

export default PieChartView;