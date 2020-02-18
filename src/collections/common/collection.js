// Backbone.Rockdoll.Collection
// ---------

import Backbone from 'backbone';

// Collections
import CommonCollection from './collections/commonCollection';
import CommonPrivateCollection from './collections/commonPrivateCollection';


let RockdollCollection = {};

RockdollCollection.CommonCollection = CommonCollection;
RockdollCollection.CommonPrivateCollection = CommonPrivateCollection;

Backbone.Rockdoll.Collection = RockdollCollection;

export default RockdollCollection;