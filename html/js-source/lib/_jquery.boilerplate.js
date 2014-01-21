define(['jquery'], function(jQuery) {

    console.log( jQuery );

    (function ( $, window, document, undefined ) {

        var pluginName = 'name',
            defaults = {

            };

        function Plugin ( element, options ) {
            this.$element = $(element);

            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        Plugin.prototype = {
            init: function() {
                var settings = this.settings;

                this.$elt1 = this.$element.find('.elt1');

                var scope = this;

                this.$elt1.click(function(e) {
                    e.preventDefault();
                    scope.test();
                });

            },
            test: function() {
                console.log('hello');
            }
        };


        $.fn[pluginName] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

    })( jQuery, window, document );

});