// ModalLayoutView
// ---------

import {version} from '../version.json';

import Marionette from 'backbone.marionette';

import ModalContentView from './modalContentView';

const ModalLayoutView = Marionette.LayoutView.extend({
    version: version,
    className: 'modal__wrapper',
    events: {},
    _modalNumber: 0,
    template: false,
    _appLayoutWrapper: false,
    _remodalWrapperClassName: 'remodal-bg remodal-is-opened',
    onRender: function () {

    },
    initialize: function () {
        this._appLayoutWrapper = App.mainLayoutView.$el.find('.p-wrapper');
    },
    onBeforeAddChild: function (childView) {
        if( !this._appLayoutWrapper.hasClass(this._remodalWrapperClassName)) {
            this._appLayoutWrapper.addClass(this._remodalWrapperClassName);
        }
    },
    onRemoveChild: function () {
        if( !this._appLayoutWrapper.hasClass(this._remodalWrapperClassName)) {
            this._appLayoutWrapper.removeClass(this._remodalWrapperClassName);
        }
    },
    removeChildView: function (view) {
        if (!view) { return view; }

        this.triggerMethod('before:remove:child', view);

        if (!view.supportsDestroyLifecycle) {
            Marionette.triggerMethodOn(view, 'before:destroy', view);
        }

        let regionName = view.parentRegionName;
        let regionClassName = view.parentRegionClassName;
        // call 'destroy' or 'remove', depending on which is found
        if (view.destroy) {
            view.destroy();
        } else {
            view.remove();
        }

        this.removeRegion(regionName);
        this.$el.find('.' + regionClassName).remove();

        this._modalNumber--;

        if (!view.supportsDestroyLifecycle) {
            Marionette.triggerMethodOn(view, 'destroy', view);
        }

        this.stopListening(view);

        this.triggerMethod('remove:child', view);

        return view;
    },
    addChild: function (child, ChildView) {
        var childViewOptions = this.getOption('childViewOptions');

        var view = this.buildChildView(child, ChildView, childViewOptions);

        // increment indices of views after this one
        this._modalNumber++;

        this.triggerMethod('before:add:child', view);

        this.listenTo(view, 'modal:closed', this.removeChildView );

        this._addChildView(view);
        this.triggerMethod('add:child', view);

        view._parent = this;

        return view;
    },
    _addChildView: function (view) {

        let regionName = 'modal-window-' + this._modalNumber;
        let className = 'remodal-window-' + this._modalNumber;

        let $container = $('<div>')
            .addClass(className);

        this.$el.append($container);
        this.addRegion(regionName, '.' + className);
        this.getRegion(regionName).show(view, {
            regionName: regionName,
            regionClassName: className
        });

    },
    buildChildView: function(child, ChildViewClass, childViewOptions) {
        var childView = new ChildViewClass(childViewOptions);
        //Marionette.MonitorDOMRefresh(childView);
        return childView;
    },
});

ModalLayoutView.contentView = ModalContentView;

export default ModalLayoutView;