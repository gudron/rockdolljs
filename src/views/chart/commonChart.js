// CommonChart
// ---------

import Marionette from 'backbone.marionette';

import 'amcharts/amcharts';
import './themes/default';
import 'amcharts/lang/ru.js'

const CommonChart = Marionette.ItemView.extend({
    model: false,
    modelEvents: {
        'change': '_changed',
    },
    amchart: false,
    amchartOptions: {
        autoResize: true,
        theme: 'default',
        language: 'ru',
        dataProvider: [],
        listeners: false
    },
    template: false,
    initialize: function () {
        this.amchartOptions.listeners = [{
            'event': 'rendered',
            'method': _.bind(this._chartRendered, this)
        }];
    },
    onAttach: function () {
        this.model.fetch();
    },
    onBeforeDestroy: function(){
        if(this.amchart) {
            this.amchart.clearLabels();
            this.amchart.removeLegend();
            this.amchart.clear();
            this.amchart = false;
        }
    },
    _changed: function () {
        let that = this;

        if(this.amchart) {
            this.amchart.dataProvider = this.model.getPreparedResult();
            this.amchart.validateData();
        } else {
            let options = _.result(this, 'amchartOptions');
            _.extend(options, this.getOption('amchartOptions'));

            options.dataProvider = this.model.getPreparedResult();
            this.amchart = window.AmCharts.makeChart(
                that.$el.get(0),
                options
            );
        }
    },
    _chartRendered: function (event) {
        this.trigger('chart:rendered', event);
    }
});

export default CommonChart;