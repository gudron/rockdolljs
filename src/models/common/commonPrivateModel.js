// Backbone.Rockdoll.CommonPrivateModel
// ---------

import CommonModel from './commonModel';

const CommonPrivateModel = CommonModel.extend({
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

        var result = CommonModel.prototype.sync.call(this, method, model, options);

        return result;
    }
});

export default CommonPrivateModel;