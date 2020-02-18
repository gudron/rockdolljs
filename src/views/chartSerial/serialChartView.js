// SerialChartView
// ---------

import ChartView from './basicChartView';

import SerialChart from './charts/serialChart'
import Filter from './filters/commonFilter'

const SerialChartView = ChartView.extend({
    model: false,
    filterView: Filter,
    chartView: SerialChart,
});

export default SerialChartView;