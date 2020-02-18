// NotificationItemView
// ---------

import Marionette from 'backbone.marionette';

import Noty from 'noty';

const NotificationItemView = Marionette.ItemView.extend({
    className: 'noty-box',
    template: false,
    noty: false,
    id: function () {
        return 'noty_' + Date.now();
    },
    initialize: function () {
        var that = this;
    },
    onAttach: function () {
        var that = this;

        this.noty = new Noty({
            text: this.model.text,
            type: this.model.type,
            container: '#' + this.$el.attr('id'),
            callbacks: {
                afterClose: function () {
                    that.triggerMethod('noty:close', that);
                },
                afterShow: function () {
                    if (that.model.callback && _.isFunction(that.model.callback)) {
                        that.model.callback.apply();
                    }
                }
            }
        });

        this.noty.show();
    },
    onBeforeDestroy: function () {
        delete this.noty;
        this.noty = false;
    }
});

export default NotificationItemView;
