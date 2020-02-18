export default {
    greaterThenField: function (value, attr, greaterThenAttr, model) {
        let defaultMessages = Backbone.Validation.messages;

        if(value < parseInt(model.get(greaterThenAttr)) ) {
            return this.format(defaultMessages.greaterThenField, this.formatLabel(attr, model), this.formatLabel(greaterThenAttr, model));
        }
    },
    lowerThenField: function (value, attr, lowerThenAttr, model) {
        let defaultMessages = Backbone.Validation.messages;

        if(value > parseInt(model.get(lowerThenAttr)) ) {
            return this.format(defaultMessages.lowerThenField, this.formatLabel(attr, model), this.formatLabel(lowerThenAttr, model));
        }
    },
    manyOf: function (values, attr, customValues, model) {
        let defaultMessages = Backbone.Validation.messages;
        let allowedList = _.isFunction(customValues) ? customValues.call(null) : customValues;

        let result = _.every(values, function (value) {
            return _.indexOf(allowedList, value) != -1;
        });

        if(!result) {
            return this.format(defaultMessages.manyOf, this.formatLabel(attr, model));
        }
    }
}