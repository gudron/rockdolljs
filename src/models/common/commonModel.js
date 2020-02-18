// Backbone.Rockdoll.CommonModel
// ---------

import _ from 'underscore';
import Backbone from 'backbone';
import moment from 'moment';

const CommonModel = Backbone.Model.extend({
    emulateJSON: true,
    _accessors: {},
    _mutators: {},
    _casts: {},
    _dateFormat: 'YYYY-MM-DD HH:mm:ss',
    url: function() {
        var Config = App.getOption('config');

        var base = Config.apiUrl + '/' + Config.apiVersion  + _.result(this, 'urlRoot');

        if (this.isNew()) {
            return base;
        }
        var id = this.attributes[this.idAttribute];

        return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },
    save: function (attributes, options) {

        var that = this;

        options = options || {};

        var success = options.success;
        options.success = function(model, response, opt) {
            that.trigger('save:success', model, response, opt);
            if (success) {
                success.call(options.context, model, response, opt);
            }
        };

        var error = options.error;
        options.error = function(model, response, opt) {
            that.trigger('save:error', model, response, opt);
            if (error) {
                error.call(options.context, model, response, opt);
            }
        };

        var result = Backbone.Model.prototype.save.call(this, attributes, options);

        return result;
    },
    fetch: function (options) {

        var that = this;

        options = options || {};

        options.data = options.data || {};
        options.data = _.extend({
            forceIdReturn: 1
        }, options.data);

        var success = options.success;
        options.success = function(model, response, opt) {
            that.trigger('fetch:success', model, response, opt);
            if (success) {
                success.call(options.context, model, response, opt);
            }
        };

        var error = options.error;
        options.error = function(model, response, opt) {
            that.trigger('fetch:error', model, response, opt);
            if (error) {
                error.call(options.context, model, response, opt);
            }
        };

        var result = Backbone.Model.prototype.fetch.call(this, options);

        return result;
    },
    destroy: function (options) {
        var that = this;

        options = options || {};

        var success = options.success;
        options.success = function(model, response, opt) {
            model.trigger('destroy:success', model, response, opt);
            if (success) {
                success.call(options.context, model, response, opt);
            }
        };

        var error = options.error;
        options.error = function(model, response, opt) {
            model.trigger('destroy:error');
            if (error) {
                error.call(options.context, response, opt);
            }
        };

        var result = Backbone.Model.prototype.destroy.call(this, options);

        return result;
    },
    set: function(key, val, options) {
        var attrs;
        var result = {};

        if (typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        // For each `set` attribute, update or delete the current value.
        for (var attr in attrs) {
            val = attrs[attr];

            if(this._hasSetMutator(attr)) {
                val = this._mutators[attr].call(this, attrs[attr]);
            }

            if(this._hasCast(attr)) {

                if (!_.isNull(attrs[attr])) {

                    switch (this._getCastType(attr)) {
                        case 'int':
                        case 'integer':
                            val = parseInt(attrs[attr]);
                            break;
                        case 'bool':
                        case 'boolean':
                            val = _.isBoolean(attrs[attr]) ? +attrs[attr] : parseInt(attrs[attr]);
                            break;
                        case 'date':
                        case 'datetime':
                            val = this._fromDate(attrs[attr]);
                            break;
                        default:
                            break;
                    }
                }

            }

            result[attr] = val;
        }

        return Backbone.Model.prototype.set.call(this, result, options)
    },
    _hasSetMutator: function (attr) {
        return !_.isUndefined(this._mutators[attr]);
    },
    // Get the value of an attribute.
    get: function(attr) {
        let val = _.get(this.attributes, attr);

        if(this._hasGetMutator(attr)) {
            val = this._mutateAttribute(attr, val);
        }

        if(this._hasCast(attr)) {
            val = this._castAttribute(attr, val);
        }

        return val;
    },
    _hasGetMutator: function (attr) {
        return !_.isUndefined(this._accessors[attr]);
    },
    _mutateAttribute: function (attrName, value) {
        return this._accessors[attrName].call(this, value);
    },
    _hasCast: function (attr) {
        return !_.isUndefined(this._casts[attr]);
    },
    _getCastType: function (attr) {
        return this._casts[attr];
    },
    _castAttribute: function (attr, value) {
        if(_.isNull(value)) {
            return value;
        }

        let val = _.get(this.attributes, attr);

        switch (this._getCastType(attr)) {
            case 'int':
            case 'integer':
                return parseInt(val);
            case 'string':
                return val.toString();
            case 'bool':
            case 'boolean':
                return !!+val;
            case 'date':
            case 'datetime':
                return this._asDate(val);
            default:
                return value;

        }
    },
    _fromDate: function (value) {
        let format = this._dateFormat;

        let momentValue = this._asDate(value);

        return momentValue.format(format);
    },
    _asDate: function (value) {
        if(moment.isMoment(value)) {
            return value;
        }

        if(value instanceof Date) {
            return moment(value);
        }

        if(_.isNumber(value) && !_.isNaN(value)) {
            return moment.unix(value)
        }

        if(/^(\d{4})-(\d{2})-(\d{2})$/.test(value)){
            return moment(value, 'YYYY-MM-DD');
        }

        if(/^(\d{4}).(\d{2}).(\d{2})$/.test(value)){
            return moment(value, 'YYYY.MM.DD');
        }

        return moment(value, this._dateFormat);
    }

});

export default CommonModel;