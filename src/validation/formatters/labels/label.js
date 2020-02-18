import Validation from 'backbone-validation';

export default {
    label: function(attrName, model) {
        return (model.labels && _.result(model, 'labels')[attrName] )
        || Backbone.Validation.labelFormatters.sentenceCase(attrName, model);
    }
};