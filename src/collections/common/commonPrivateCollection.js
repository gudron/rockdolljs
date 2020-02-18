// Backbone.Rockdoll.CommonPrivateCollection
// ---------

import CommonCollection from './commonCollection';

import RockdollModel from 'rockdolljs.model';

export default CommonCollection.extend({
    model: RockdollModel.CommonPrivateModel,
    sync: function(method, model, options) {
        var that = this;

        options = options || {};

        var beforeSend = options.beforeSend;

        options.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization' , 'Bearer ' + App.apiToken.get('access_token'));

            if(beforeSend) {
                beforeSend.call(options.context, xhr);
            }
        };

        var result = CommonCollection.prototype.sync.call(this, method, model, options);

        return result;
    },
});