// OptionView
// ---------

import Marionette from 'backbone.marionette';

const OptionView = Marionette.ItemView.extend({
    tagName: 'option',
    template: false,
    setSelected: function () {
        this.$el.prop('selected', true);
    },
    setUnselected: function () {
        this.$el.prop('selected', false);
        this.$el.removeProperty('selected');
    }
});

export default OptionView;