// FormView
// ---------

import Marionette from 'backbone.marionette';

import qtip from 'qtip2';

const FormView = Marionette.LayoutView.extend({
    tagName: 'form',
    className: 'app-form',
    events: {},
    formEvents: {
        'change input': '_fieldChanged',
        'change select.select2-select': '_fieldChanged',
        'keypress': '_onPressEnter'
    },
    triggers: {
        'click .btn.submit': {
            event: 'form:submit',
            preventDefault: true
        }
    },
    fields: {},
    _errorClass: 'has-error',
    _dataValidationErrorCode: [422],
    _serverErrorCode: [500],
    constructor: function(options) {
        _.extend(this.events, this.formEvents);

        Marionette.LayoutView.prototype.constructor.call(this, options);
        this._formInitialize.apply(this, arguments);
    },
    _formInitialize: function () {
        var that = this;

        this.on('form:submit', this.onSubmit, this);
        this.on('validation:success', this.onFormValid, this);

        this.listenTo(this.model, 'save:success', this.onSaveSuccess);
        this.listenTo(this.model, 'save:error', this.onSaveError);

        Backbone.Validation.bind(this, {
            invalid: that._invalidFieldCallback,
            valid: that._validFieldCallback
        });
    },
    _invalidFieldCallback: function (view, attr, error) {
        var that = this;

        var $field = view.$el.find('#' + attr);
        if($field.hasClass('select2-select')) {
            $field = $field.next('.select2-container');
        }
        if(!$field.hasClass(view._errorClass)) {
            $field.addClass(view._errorClass);
        }
        $($field).qtip({
            attr: 'data-tooltip',
            style: {
                classes: 'qtip-gmt',
                tip: {
                    border: 0,
                    width: 1,
                    height: 1
                }
            },
            position: {
                my: 'center left',
                at: 'center right',
                container: $($field).parent('div'),
                distance: 8
            },
            content: {
                text: error
            },
            hide: {
                event: 'click'
            }
        });
        $($field).qtip('api').show();
    },
    _validFieldCallback: function (view, attr, selector) {
        var that = this;
        var $field = view.$el.find('#' + attr);

        if($field.hasClass('select2-select')) {
            $field = $field.next('.select2-container');
        }

        if($field.hasClass(view._errorClass)) {
            $field.removeClass(view._errorClass);
            var qtipApi = $($field).qtip('api');
            qtipApi.destroy()
        }
    },
    _fieldChanged: function (event) {
        var $input = $(event.currentTarget);
        var attrName = $input.attr('id');

        let fieldsValues = _.result(this, 'fields');

        this.model.set(attrName, fieldsValues[attrName]);
        var valid = this.model.isValid(attrName);
    },
    _onPressEnter: function (event) {
        if (event.which !== 13) return;
        event.preventDefault();
        this.trigger('form:submit');
    },
    onSubmit: function (args) {
        var fieldsValues = {};

        fieldsValues = _.result(this, 'fields');

        this.model.set(fieldsValues);
        this.model.validate();

        if(this.model.isValid()) {
            this.trigger('validation:success');
        } else {
            this.model.clear({silent: true});
        }
    },
    onFormValid: function () {
        this.model.save();
    },
    onSaveError: function (model, response, opt) {
        var that = this;
        if(_.contains(this._dataValidationErrorCode, response.status)) {
            that.onDataValidationError(model, response, opt)
        } else if(_.contains(this._serverErrorCode, response.status)) {
            that.onServerError(model, response, opt)
        } else if(response.status == 404) {
            that.onNotFoundError(model, response, opt)
        }
        else {
            that.onError(model, response, opt);
        }

    },
    onDataValidationError: function (model, response, opt) {
        var that = this;

        var invalidAttrs = {};
        _.each(response.responseJSON, function (errorObj, index) {
            var field = errorObj.field;
            var errorMessage = errorObj.message;

            invalidAttrs[field] = errorMessage;
            that._invalidFieldCallback(that, field, errorMessage);
        });
    },
    onError: function (model, response, opt) {
        if(_.isUndefined(response.responseJSON.error_description)) {
            App.errorNotify(App.t('global.unknown_error'));
        } else {
            App.errorNotify(response.responseJSON.error_description);
        }
    },
    onServerError: function (model, response, opt) {
        if(_.isUndefined(response.responseJSON.error_description)) {
            App.errorNotify(App.t('global.unknown_server_error'));
        } else {
            App.errorNotify(response.responseJSON.error_description);
        }
    },
    onNotFoundError: function () {

    },
    onSaveSuccess: function (model, response, opt) {

    },
    onBeforeDestroy: function () {
        // TODO: fix getting field names without invoking 'fields' function because the fields' values might not be 'gettable' at the time
        // this._clearQtip();
        Backbone.Validation.unbind(this);
        this.model.clear({silent: true});
        this.model = false;
    },
    _clearQtip: function () {
        let that = this;

        let fieldsValues = _.result(this, 'fields');

        _.each(fieldsValues, function (field, index) {
            let $field = that.$el.find('#' + index);

            if($field.length > 0) {
                if ($field.hasClass('select2-select')) {
                    $field = $field.next('.select2-container');
                }

                if(!_.isUndefined( $($field).qtip('api') )) {
                    $($field).qtip('api').destroy();
                }

            }
        });


    }
});

export default FormView;