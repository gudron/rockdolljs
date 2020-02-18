export default {
    // Replaces nummeric placeholders like {0} in a string with arguments
    // passed to the function
    format: function() {
        var args = Array.prototype.slice.call(arguments),
            text = App.t(args.shift());
        return text.replace(/\{(\d+)\}/g, function(match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }
}