define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone');

    require('jqueryCookie');

    return Backbone.View.extend({
        processField: function(e) {
            var target$ = $(e.target),
                fieldNameAttr = target$.attr('name');

            this.model.set(fieldNameAttr, target$.val(), {
                validate: true
            });
        },

        processForm: function(e) {
            e.preventDefault();
            this.$('[data-name=option]').slice(2).each(function() {
                var targetParent$ = $(this).closest('.form-control');
                if ($.trim($(this).val()) === '') {
                    targetParent$.remove();
                }
            });
            if (this.model.isValid(true)) {
                this.postData();
            }
        },

        showError: function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.parent();

            // Error styles are based on Bootstrap 3 HTML structure.
            if (targetSelector$.prop('type') === 'radio') {
                targetParent$ = targetSelector$.parent().parent().parent();
            }

            targetParent$.addClass("has-error");
            targetParent$.find('.hint-message').show().addClass('text-danger').html(error);
        },

        removeError: function(view, attr) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.parent();

            // Error styles are based on Bootstrap 3 HTML structure.
            if (targetSelector$.prop('type') === 'radio') {
                targetParent$ = targetSelector$.parent().parent().parent();
            }

            targetParent$.removeClass("has-error");
            targetParent$.find('.hint-message').hide().removeClass('text-danger').html('');
        }
    });
});