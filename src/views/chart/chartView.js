// CharView
// ---------
import {version} from '../version.json';

import BasicChartView from './basicChartView';
import SerialChartView from './serialChartView';
import PieChartView from './pieChartView';

const ChartView = {
    version: version,
    BasicChartView: BasicChartView,
    SerialChartView: SerialChartView,
    PieChartView: PieChartView
};

export default ChartView