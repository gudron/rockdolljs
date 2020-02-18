// Backbone.Rockdoll.CommonCollection
// ---------

import _ from 'underscore';
import Backbone from 'backbone';

const CommonCollection = Backbone.Collection.extend({
    url: function() {
        var Config = App.getOption('config');

        var base = Config.apiUrl + '/' + Config.apiVersion  + _.result(this, 'urlRoot');

        return base;
    },
    save: function (attributes, options) {

        var collection = this;

        options = options || {};

        var success = options.success;
        options.success = function(resp) {
            collection.trigger('save:success', resp);
            if (success) {
                success.call(options.context, collection, resp, options);
            }
        };

        var error = options.error;
        options.error = function(resp) {
            collection.trigger('save:error');
            if (error) {
                error.call(options.context, collection, resp, options);
            }
        };

        var result = Backbone.Collection.prototype.save.call(this, attributes, options);

        return result;
    },
    fetch: function (options) {

        var that = this;

        options = options || {};

        options.data = options.data || {};
        options.data = _.extend({
            forceIdReturn: 1,
            _disablePagination: 0
        }, options.data);

        var success = options.success;
        options.success = function(resp) {
            that.trigger('fetch:success', resp);
            if (success) {
                success.call(options.context, resp);
            }
        };

        var error = options.error;
        options.error = function(resp) {
            that.trigger('fetch:error');
            if (error) {
                error.call(options.context, resp);
            }
        };

        var result = Backbone.Collection.prototype.fetch.call(this, options);

        return result;
    },
    destroy: function (options) {
        var that = this;

        options = options || {};

        var success = options.success;
        options.success = function(resp) {
            that.trigger('destroy:success', resp);
            if (success) {
                success.call(options.context, resp);
            }
        };

        var error = options.error;
        options.error = function(resp) {
            that.trigger('destroy:error');
            if (error) {
                error.call(options.context, resp);
            }
        };

        var result = Backbone.Collection.prototype.destroy.call(this, options);

        return result;
    }
});

export default CommonCollection;