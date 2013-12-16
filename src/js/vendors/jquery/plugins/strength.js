;(function ( $, window, document, undefined ) {
    var pluginName = "strength",
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter'
        };

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var characters = 0;
            var capitalletters = 0;
            var loweletters = 0;
            var number = 0;
            var special = 0;
            var upperCase= new RegExp('[A-Z]');
            var lowerCase= new RegExp('[a-z]');
            var numbers = new RegExp('[0-9]');
            var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

            function GetPercentage(a, b) {
                return ((b / a) * 100);
            }

            function check_strength(thisval,thisid){
                if (thisval.length > 8) { characters = 1; } else { characters = 0; };
                if (thisval.match(upperCase)) { capitalletters = 1} else { capitalletters = 0; };
                if (thisval.match(lowerCase)) { loweletters = 1}  else { loweletters = 0; };
                if (thisval.match(numbers)) { number = 1}  else { number = 0; };

                var total = characters + capitalletters + loweletters + number + special;
                var totalpercent = GetPercentage(7, total).toFixed(0);

                get_total(total,thisid);
            }

            function get_total(total,thisid){
                var thismeter = $('div[data-meter="'+thisid+'"]');
                if(total == 0){
                    thismeter.removeClass().html('');
                }else if (total <= 1) {
                    thismeter.removeClass();
                    thismeter.addClass('progress').css('margin-top','5px').html('<div class="progress-bar progress-bar-danger text-danger" style="width:100%; line-height:20px;">Password strength is very weak</div>');
                } else if (total == 2){
                    thismeter.removeClass();
                    thismeter.addClass('progress').css('margin-top','5px').html('<div class="progress-bar progress-bar-warning text-warning" style="width:100%; line-height:20px;">Password strength is weak</div>');
                } else if (total == 3){
                    thismeter.removeClass();
                    thismeter.addClass('progress').css('margin-top','5px').html('<div class="progress-bar progress-bar-info text-info" style="width:100%; line-height:20px;">Password strength is medium</div>');
                } else {
                    thismeter.removeClass();
                    thismeter.addClass('progress').css('margin-top','5px').html('<div class="progress-bar progress-bar-success text-success" style="width:100%; line-height:20px;">Password strength is strong</div>');
                }
            }

            thisid = this.$elem.attr('id');

            this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid).after('<input placeholder="Specify your new password" id="newPassword" style="display:none" class="form-control '+this.options.strengthClass+'" data-password="'+thisid+'" type="text" name="" value=""><span class="hint-message" style="display:none;"></span><div data-meter="'+thisid+'"></div>');

            this.$elem.bind('keyup keydown change', function(event) {
                thisval = $('#'+thisid).val();
                $('input[type="text"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
            });

            $('input[type="text"][data-password="'+thisid+'"]').bind('keyup keydown change', function(event) {
                thisval = $('input[type="text"][data-password="'+thisid+'"]').val();
                $('input[type="password"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );


