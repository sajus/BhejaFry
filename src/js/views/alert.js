define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        template = require('template!templates/alert'),
        Events = require('events');

    require('bsAlert');

    var metadata = {
        'success': {
            typeClass: 'alert-success',
            title: 'Success!'
        },
        'error': {
            typeClass: 'alert-danger',
            title: 'Error!'
        },
        'warning': {
            typeClass: 'alert-warning',
            title: 'Warning!'
        },
        'info': {
            typeClass: 'alert-info',
            title: 'Information!'
        }
    };

    var AlertView = Backbone.View.extend({

        template: template,

        initialize: function() {
            $(window).on('scroll', _.bind(this.scrollSpy, this));
            Events.on('alert:hideAlert', this.hideAlert, this);
        },

        scrollSpy: function() {
            this.elOffset = this.elOffset || this.$el.offset().top;
            this.$el.toggleClass('alert-container-fixed', window.scrollY > this.elOffset);
        },

        hideAlert: function(options) {
            var $el = this.$el;
            var $alert = this.$('.alert').alert();
            $el.addClass('fade');
            setTimeout(function() {
                $alert.alert('close');
                $el.removeClass('fade');
                var input = options.view.$el.find('[name="' + options.selector + '"]');
                if (input) {
                    input.closest('.control-group')
                        .removeClass('error')
                        .end()
                        .attr('invalid', '');
                }
            }, 150);
        },

        render: function() {

            var type = this.model.get('type');
            var $el = this.$el;
            var activeModal = $('body > .modal').filter(':visible');

            // If Modal is the active view then direct alerts to the modal.
            if (activeModal.length) {
                $el = activeModal.find('.modalAlertContainer');
            }

            var modalEl = this.model.getModalEl();
            if (modalEl) {
                $el = modalEl.find('.modalAlertContainer');
            }

            this.model.set(metadata[type]);

            $.each(this.model.get('messages'), function(index, message) {
                if (message.elementSelector) {
                    $(message.elementSelector)
                        .closest('.control-group')
                        .addClass('error')
                        .end()
                        .attr('invalid', 'invalid');
                }
            });

            $el.html(this.template(this.model.toJSON()));

            if (!modalEl) {
                this.scrollSpy();
            }

            if (type === 'success' || type === 'warning' || type === 'error') {
                var $alert = this.$('.alert').alert();
                setTimeout(function() {
                    $el.addClass('fade');
                    setTimeout(function() {
                        $alert.alert('close');
                        $el.removeClass('fade');
                    }, 150);
                }, 3500);
            }


            this.$('.alert').alert({
                closed: function() {
                    Events.trigger('alert:closed');
                }
            });

            return this;
        }
    });

    return AlertView;
});