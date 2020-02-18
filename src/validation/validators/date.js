import moment from 'moment';

export default {
    minAge: function (value, attr, customValue, model) {
        let defaultMessages = Backbone.Validation.messages;

        var acceptanceDate = moment()
            .subtract(customValue, 'years');

        var inputDate = moment(value);

        if(acceptanceDate.isBefore(inputDate)) {
            return this.format(defaultMessages.minAge, this.formatLabel(attr, model), customValue);
        }
    },
    maxAge: function (value, attr, customValue, model) {
        let defaultMessages = Backbone.Validation.messages;

        var acceptanceDate = moment()
            .subtract(customValue, 'years');

        var inputDate = moment(value);

        if(acceptanceDate.isAfter(inputDate)) {
            return this.format(defaultMessages.maxAge, this.formatLabel(attr, model), customValue);
        }
    },
    rangeAge: function (value, attr, customValue, model) {
        let defaultMessages = Backbone.Validation.messages;

        var minAcceptanceDate = moment()
            .subtract(customValue[0], 'years');

        var maxAcceptanceDate = moment()
            .subtract(customValue[1], 'years');

        var inputDate = moment(value);

        if(!inputDate.isBetween(maxAcceptanceDate, minAcceptanceDate)) {
            return this.format(defaultMessages.rangeAge, this.formatLabel(attr, model), customValue[0], customValue[1]);
        }
    },
}