// SerialChart
// ---------

import CommonChart from './commonChart';

import 'amcharts/serial';

const SerialChart = CommonChart.extend({
    amchartOptions: function () {
        return _.extend({}, CommonChart.prototype.amchartOptions, {
                type: 'serial',
                graphs: [ {
                    valueField: 'value'
                } ],
                valueAxes: [ {
                    axisAlpha: 0,
                    inside: true,
                    dashLength: 3
                } ],
                chartCursor: {
                    valueLineEnabled: true,
                    categoryBalloonDateFormat: 'DD MMM YYYY'
                },
                dataDateFormat: 'YYYY-MM-DD HH:NN:SS',
                categoryField: 'date',
                categoryAxis: {
                    parseDates: true,
                    minPeriod: 'DD',
                    dateFormats: [
                        {
                            period: 'fff',
                            format: 'HH:NN:SS'
                        },
                        {
                            period: 'ss',
                            format: 'HH:NN:SS'
                        },
                        {
                            period: 'mm',
                            format: 'HH:NN'
                        },
                        {
                            period: 'hh',
                            format: 'HH:NN'
                        },
                        {
                            period: 'DD',
                            format: 'DD MMM'
                        },
                        {
                            period: 'WW',
                            format: 'DD MMM'
                        },
                        {
                            period: 'MM',
                            format: 'MMM YYYY'
                        },
                        {
                            period: 'YYYY',
                            format: 'MMM YYYY'
                        }
                    ]
                }
            }
        );
    },
});

export default SerialChart;
