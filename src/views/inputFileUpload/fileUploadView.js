// FileUploadView
// ---------

import Marionette from 'backbone.marionette';

import Resumable from 'resumablejs';

import qtip from 'qtip2';

const FileUploadView = Marionette.ItemView.extend({
    ui: {
        title: '.file-upload__title',
        preloader: '.file-upload__preloader',
        buttonWrapper: '.btn'
    },
    input: false,
    $input: false,
    r: false,
    maxFileSize: function() {
        return 5 * 1024 * 1024;
    },
    acceptableFileTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

        'image/jpeg',
        'image/png',
        'image/tiff',
        'image/gif'
    ],
    errors: function () {
        return {
            invalidFileSize: App.t('global.invalid_file_size'),
            invalidFileType: App.t('global.invalid_file_type'),
        }
    },
    preloaderTemplate: false,
    template: false,
    initialize: function () {
        var that = this;

        this.r = new Resumable({
            maxFiles: 1,
            chunkSize: _.result(this, 'maxFileSize'),
            testChunks: false,
            simultaneousUploads: 1,
            prioritizeFirstAndLastChunk: true,
            singleFile: true,
            headers: { 'Authorization': 'Bearer ' + App.apiToken.get('access_token') }
        });

        this.r.on('filesAdded', function(files, arraySkipped){
            return that._onFileChange(files);
        });

        this.r.on('fileSuccess', function(file, message){
            return that._onFileUploadSuccess(file, message);
        });

        this.preloaderTemplate = PreloaderTemplate({
            hasWrapper: true,
            title: App.t('global.preloader_title')
        });

    },
    onRender: function () {
        this.$input = this.$el.find('.js-upload-file-input');
        this.input = this.$input[0];

        this.$input.prop('id', this.getOption('id'));

        this.ui.preloader.append(this.preloaderTemplate);
    },
    onShow: function () {
        var that = this;

        that.r.assignBrowse(that.input, false);
    },
    onBeforeDestroy: function () {
        delete this.input;
        delete this.$input;
        delete this.r;
        this.$input = this.input = false;
    },
    _onFileChange: function (files) {
        var that = this;

        that._setInProgressState();

        let file = _.first(files);
        let errors = [];
        let errorMessages = _.result(this, 'errors');
        let hasError = false;

        if(!this._isValidFileSize(file)) {
            hasError = true;
            errors.push(errorMessages.invalidFileSize );
        }

        if(!this._isValidFileType(file)) {
            hasError = true;
            errors.push(errorMessages.invalidFileType );
        }

        if(!hasError) {
            this.trigger('file:validation:success', this.r, file);
            that.onFileReadSuccess(file);
        } else {
            that.onFileValidationError(file, errors);
            this.trigger('file:validation:error', this.r, file, errors);
        }
    },
    _onFileUploadSuccess: function (file, message) {
        this.trigger('file:upload:success', file, message);
        this.reset();
    },
    onFileReadSuccess: function (file) {
        this._setCompleteState();

        this.ui.title.text(file.name);

        this.trigger('file:read:success', this.r, file);
    },
    onFileValidationError: function (file, errors) {
        this._setCompleteState();
        this.ui.title.text(App.t('global.file_button_has_error') + _.first(errors));
    },
    reset: function () {
        this.ui.title.text(App.t('global.file_button_choose_file'));
        this._setCompleteState();
    },
    disable: function () {
        this.$input.prop('disabled', true);
        this.ui.buttonWrapper.addClass('btn--ghost-gray');
        this.ui.buttonWrapper.removeClass('btn--ghost-wild-blue');
    },
    enable: function () {
        this.$input.prop('disabled', false);
        this.ui.buttonWrapper.removeClass('btn--ghost-gray');
        this.ui.buttonWrapper.addClass('btn--ghost-wild-blue');
    },
    _isValidFileSize: function (rfile) {
        return (rfile.size < _.result(this, 'maxFileSize') );
    },
    _isValidFileType: function (rfile) {
        return _.contains(_.result(this, 'acceptableFileTypes'), rfile.file.type) ;
    },
    _setInProgressState: function () {
        this.$el.find('.controls').hide();
        this.ui.preloader.show();
    },
    _setCompleteState: function () {
        this.$el.find('.controls').show();
        this.ui.preloader.hide();
    },
});

export default FileUploadView;