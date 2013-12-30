define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        Baseview = require('views/baseview'),
        Events = require('events'),
        ChangePassModel = require('models/login/changePassModel'),
        changePassTemplate = require('template!templates/login/changePassModal');

    require('bsModal');
    require('modelBinder');
    require('strength');
    require('keygen');

    return Baseview.extend({

        initialize: function() {
            this.model = new ChangePassModel();
            this.modelBinder = new Backbone.ModelBinder();
        },

        className: "modal fade",

        events: {
            'submit .changePassForm': 'processForm',
            'change :input[type="password"]': 'processField',
            'click .showPassToggle': 'showPassToggle',
            'keydown #newPassword, #currentPassword': 'enableShowPass',
            'click .keygenPass': 'keygenPass'
        },

        render: function() {
            this.$el.html(changePassTemplate);
            this.uxFormation();

            this.modelBinder.bind(this.model, this.el);

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        uxFormation: function() {
            this.$el.find('#currentPassword').focus();
            this.$el.find('.modal-dialog').css('width', '600px');

            this.$el.find('#newPassword').strength({
                strengthClass: 'strength',
                strengthMeterClass: 'strength_meter',
                strengthButtonClass: 'button_strength'
            });
            this.$el.find('.showPassToggle').prop('disabled', true);
        },

        enableShowPass: function() {
            if (this.$el.find('#newPassword').val().length === 0 && this.$el.find('#currentPassword').val().length === 0) {
                this.$el.find('.showPassToggle').prop('disabled', true);
            } else {
                this.$el.find('.showPassToggle').prop('disabled', false);
            }
        },

        showPassToggle: function(e) {
            if (this.$(':input[class="showPassToggle"]').is(':checked')) {
                this.$el.find('#newPassword').prop('type', 'text');
                this.$el.find('#currentPassword').prop('type', 'text');
                this.$el.find('.toggleMsg').html('Hide');
                this.$(e.target).prop('checked', true);
            } else {
                this.$el.find('#newPassword').prop('type', 'password');
                this.$el.find('#currentPassword').prop('type', 'password');
                this.$el.find('.toggleMsg').html('Show');
                this.$(e.target).prop('checked', false);
            }
        },

        keygenPass: function() {
            this.$el.find('.strength').val(generatePassword(12, false)).change();
        },

        postData: function() {
            this.model.save(this.model.toJSON(), {
                success: function() {
                    setTimeout(function() {
                        Events.trigger('modal:closeModal');
                    }, 1000);
                    Events.trigger("alert:success", [{
                        message: "Your password has been changed successfully."
                    }]);
                },
                error: function(model, response) {
                    Events.trigger("alert:error", [{
                        message: response.responseText || "The current password you entered is incorrect."
                    }]);
                }
            });
        }
    });
});