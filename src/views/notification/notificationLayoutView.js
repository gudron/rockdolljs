// NotificationLayoutView
// ---------

import {version} from '../version.json';

import Marionette from 'backbone.marionette';

import NotificationItemView from './notificationItemView';

import Noty from 'noty';

const NotificationLayoutView = Marionette.CollectionView.extend({
    version: version,
    options: {
        theme: 'mint',
        layout: 'topCenter',
    },
    className: 'noty-container',
    template: false,
    childView: NotificationItemView,
    _notificationNumber: 0,
    childEvents: {
        'noty:close': function (view) {
            this.removeChildView(view);
        }
    },
    initialize: function () {
        var that = this;

        Noty.overrideDefaults(_.extend({
            maxVisible: 5,
            killer: false,
            timeout: 5000,
            progressBar: false
        }, this.options) );
    },
    addChild: function (child, ChildView) {
        var args = [child, ChildView, this._notificationNumber++];
        Marionette.CollectionView.prototype.addChild.apply(this, args );
    }
});

NotificationLayoutView.itemView = NotificationItemView;

export default NotificationLayoutView;