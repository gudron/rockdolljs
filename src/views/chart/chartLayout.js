// BasicChartView
// ---------
import Marionette from 'backbone.marionette';

const BasicChartView = Marionette.LayoutView.extend({
    model: false,
    regions: {
        filter: '.chart-switch__header',
        chart: '.chart-switch__body',
    },
    disableFilter: false,
    initialize: function () {
        if(this.getOption('chartView')) {
            this.chartView = this.getOption('chartView');
        }

        if(this.getOption('filterView')) {
            this.filterView = this.getOption('filterView');
        }

        if(this.getOption('model')) {
            this.model = this.getOption('model');
        }
    },
    filterView: false,
    chartView: false,
    template: _.template('<div class="chart-switch__header"></div><div class="chart-switch__body"></div>'),
    onShow: function () {
        this._showFilter();
        this._showChart();
    },
    _showFilter: function () {
        if(!this.disableFilter){
            this.showChildView('filter', new this.filterView({
                model: this.model
            }));
        }
    },
    _showChart: function () {
        this.showChildView('chart', new this.chartView({
            model: this.model,
            amchartOptions: this.getOption('amchartOptions')
        }));
    }
});

export default BasicChartView;
