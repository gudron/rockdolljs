// PieChart
// ---------

import CommonChart from './commonChart';

import 'amcharts/pie';

const PieChart = CommonChart.extend({
    amchartOptions: function () {
        return _.extend({}, CommonChart.prototype.amchartOptions, {
                type: 'pie',

                categoryField: 'date',

                /* Make the chart stretch to full width/height of the container */
                autoMargins: false,
                labelsEnabled: false,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                pullOutRadius: 0,

                radius: '50%',
                innerRadius: '50%'
            }
        );
    },

});

export default PieChart;
