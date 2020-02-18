const chart = {

    themeName: 'default',

    AmChart: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        color: '#909eac',
        backgroundColor: '#ffffff',
        pathToImages: '/img/amcharts/'
    },

    AmCoordinateChart: {
        colors: ['#ff6700', '#fdd400', '#84b761', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f', '#b93e3d', '#913167']
    },

    AmSlicedChart: {
        colors: ['#dfb645', '#68ae0d', '#67b7dc', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f', '#b93e3d', '#913167'],
        backgroundColor: '#f6f9fb',
        outlineAlpha: 0,
        outlineThickness: 0,
        labelTickColor: '#2a2a2a',
        labelTickAlpha: 0.3
    },

    AmGraph: {
        fillAlphas: 0.1,
        lineThickness: 3,
        bullet: 'square',
        bulletAlpha: 0,
        bulletSize: 1,
        bulletBorderColor: '#ffffff',
        bulletBorderAlpha: 0,
        bulletBorderThickness: 0
    },

    AxisBase: {
        axisColor: '#ebeff2',
        axisThickness: 1
    },

    CategoryAxis: {
        gridColor: '#cad4df',
        gridAlpha: 1,
        gridThickness: 1,
        gridPosition: 'start',
        dashLength: 4
    },

    ChartCursor: {
        cursorColor: '#ff6700',
        valueLineEnabled: true,
        color: '#ffffff',
        cursorAlpha: 0.3
    }
};

AmCharts.themes.default = chart;

export default AmCharts.themes.default