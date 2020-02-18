// ModalItemView
// ---------

import Marionette from 'backbone.marionette';
import Remodal from 'remodal';

const ModalContentView = Marionette.LayoutView.extend({
    _remodal: false,
    parentRegionName: false,
    parentRegionClassName: false,
    triggers: {
        'click .btn.cancel-btn': {
            event: 'modal:close:click',
            preventDefault: true
        }
    },
    onBeforeShow: function (view, region, options) {
        this.parentRegionName = options.regionName;
        this.parentRegionClassName = options.regionClassName;
    },
    onAttach: function () {
        let that = this;
        this._remodal = $(this.$el).remodal();

        this._remodal.$modal.on('closed', function (event) {
            that._onRemodalClosed(event);
            that.trigger('modal:closed', that, event);
        });

        this._remodal.$modal.on('opened', function (event) {
            that._onRemodalOpened(event);
            that.trigger('modal:opened', that, event);
        });

        this._remodal.open();
    },
    onBeforeDestroy: function () {
        if(_.contains(['opened', 'opening'],  this._remodal.getState() )) {
            this._remodal.close();
        }

        this._remodal.destroy();
        this._remodal = false;
    },
    _onRemodalClosed: function (event) {
    },
    _onRemodalOpened: function (event) {
    },
    onModalCloseClick: function (event) {
        this._remodal.close();
    }
});

export default ModalContentView;