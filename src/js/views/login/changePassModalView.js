define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        BaseView = require('views/BaseView'),
        ChangePassModel = require('models/login/changePassModel'),
        changePassTemplate = require('template!templates/login/changePassModal');

    require('bsModal');
    require('modelBinder');
    require('strength');

    return BaseView.extend({

        initialize: function() {
            this.model = new ChangePassModel();
            this._modelBinder = new Backbone.ModelBinder();
        },

        className: "modal fade",

        events: {
            'submit .changePassForm': 'processForm',
            'change :input[type="password"]': 'processField',
            'click .showPassToggle': 'showPassToggle',
            'keyup #newPassword': 'enableShowPass',
            'click .keygenPass': 'keygenPass'
        },

        render: function() {
            this.$el.html(changePassTemplate());
            this._modelBinder.bind(this.model, this.el);

            this.$el.find('.modal-dialog').css('width', '600px');

            this.$el.find('#newPassword').strength({
                strengthClass: 'strength',
                strengthMeterClass: 'strength_meter',
                strengthButtonClass: 'button_strength'
            });
            this.$el.find('.showPassToggle').prop('disabled', true);

            return this;
        },

        enableShowPass: function() {
            if( this.$el.find('#newPassword').val().length === 0 ) {
                this.$el.find('.showPassToggle').prop('disabled', true);
            } else {
                this.$el.find('.showPassToggle').prop('disabled', false);
            }
        },

        showPassToggle: function(e) {
            if (this.$(':input[class="showPassToggle"]').is(':checked')) {
                this.$el.find('#newPassword').prop('type', 'text');
                this.$el.find('.toggleMsg').html('Hide');
                this.$(e.target).prop('checked', true);
            } else {
                this.$el.find('#newPassword').prop('type', 'password');
                this.$el.find('.toggleMsg').html('Show');
                this.$(e.target).prop('checked', false);
            }
        },

        keygenPass: function() {
            var keylist = "abcdefghijklmnopqrstuvwxyz123456789",
                temp = '',
                plength = 12;
            for (var i = 0; i < plength; i++) {
                temp += keylist.charAt(Math.floor(Math.random() * keylist.length));
            }
            this.$el.find('.strength').val(temp).change();
        }
    });
});