// Backbone.Rockdoll.Model
// ---------

import Backbone from 'backbone';

// Models
import CommonModel from './models/commonModel';
import CommonPrivateModel from './models/commonPrivateModel';

let RockdollModel = {};

RockdollModel.CommonModel = CommonModel;
RockdollModel.CommonPrivateModel = CommonPrivateModel;

Backbone.RockdollModel = Rockdoll;

export default RockdollModel;