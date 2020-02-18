// SelectView
// ---------

import Marionette from 'backbone.marionette';

import niceScroll from 'jquery.nicescroll';
import Select2 from 'select2';

import OptionView from './optionView';

const customScrollOptions = {
    background: '#e0e9f3',
    autohidemode: false,
    cursorcolor: '#cad1d8',
    cursorborder: '#cad1d8',
    cursorwidth: "4px",
    spacebarenabled: false,
    horizrailenabled: false,
    sensitiverail: false,
    /**
     * MutationObserver should be disabled
     * 'cause the scrollbar begins to flicker
     * when moving from one option to another
     * inside the dropdown
     **/
    disablemutationobserver: true
};

const SelectView = Marionette.CollectionView.extend({
    tagName: 'select',
    className: 'select2-select',
    childView: OptionView,
    optionText: false,
    events: {
        'select2:open': function (evt) {
            // If there's only the default option, show the preloader
            if (evt.target.childElementCount <= 1) {
                $('.select2-results').append(this._compiledPreloaderTemplate);
                return;
            }

            $('.select2-results__options').niceScroll(customScrollOptions);
        },
        'select2:closing': function () {
            $('.select2-results').children('.preloader-wrapper').remove();
            $('.select2-results__options').getNiceScroll().remove();
        },
        'change': function (event) {

            var id = this.$el.select2('data')[0]['id'];
            var model = this.collection._byId[id];
            this.trigger('change', event, model);
            this.$el.trigger('change.select2', event, model);
        }
    },
/*    triggers: {
        "change": "change"
    },*/
    childViewTemplate: false,
    childViewNameAttribute: 't_name',
    selectOptions: [],
    select2Options: {
        language: {
            noResults: function () {
                return App.t('global.select_view_no_results');
            }
        },
        theme: 'gmt',
        placeholder: '',
        width: '100%',
        dropdownAutoWidth: true,
    },
    current_item_id: false,
    preloaderTemplate: false,
    _compiledPreloaderTemplate: false,
    initialize: function () {
        this.childViewNameAttribute = this.getOption('childViewNameAttribute');

        if(this.getOption('optionText')) {
            this.optionText = this.getOption('optionText');
        }

        if(this.getOption('current_item_id')) {
            this.current_item_id = this.getOption('current_item_id');
        }

        this.preloaderTemplate = this.getOption('preloaderTemplate');
        this._compiledPreloaderTemplate = this.preloaderTemplate({
            hasWrapper: true,
            title: App.t('global.preloader_title')
        });
    },
    onShow: function () {
        this.$el.prepend($('<option>').attr('selected', true));
        this.$el.select2(this.select2Options);
    },
    buildChildView: function(child, ChildViewClass, childViewOptions){
        childViewOptions = childViewOptions || {};

        let model_id = null;
        if (typeof(child.getEntityId) !== 'undefined') {
            model_id = child.getEntityId();
        } else {
            model_id = child.get('id');
        }
        // build the final list of options for the childView class
        let attributes = {
            value: model_id,
            'data-code': model_id
        };

        if (childViewOptions.hasOwnProperty('attributes')) {
            _.extend(attributes, childViewOptions.attributes)
        }

        if(this.current_item_id == model_id) {
            _.extend(attributes, {
                selected: true
            });
        }

        // create the child view instance
        let optionViewProperties = {};
        _.extend(optionViewProperties, childViewOptions, {
            attributes: attributes
        });

        if(this.childViewTemplate) {
            _.extend(optionViewProperties, {
                template: this.childViewTemplate
            });
        }

        let view = new OptionView(optionViewProperties);
        this.selectOptions.push(view);

        let text = child.get(this.childViewNameAttribute);
        if(this.optionText) {
            if(_.isFunction(this.optionText)) {
                let optionText = _.bind(this.optionText, child);
                text = optionText();
            } else {
                text = child.get(this.optionText);
            }
        } else if (typeof (child.optionText) === 'function') {
            text = child.optionText();
        }
        view.$el.text(text);

        // return it
        return view;
    },
    onRenderCollection: function (view) {
        // When select options arrived and rendered,
        // reload an opened select dropdown (if select2 is initialized)
        if (view.$el.data('select2') && view.$el.select2('isOpen')) {
            view.$el.select2('close').select2('open');
        }
    },
    onBeforeDestroy: function(){
        _.each(this.selectOptions, function (optionView, index) {
            optionView.destroy();
        });

        this.$el.select2('val', '');
        this.$el.select2('enable', false);
        this.$el.select2('destroy');

        delete this._compiledPreloaderTemplate;
    },
    setCurrentItem: function (item) {
        var that = this;
        this.current_item_id = item;
        _.each(this.selectOptions, function (optionView, index) {
            if(optionView.attributes.value == item) {
                optionView.setSelected();
                that.$el.change();
            }
        });
    }
});

export default SelectView;