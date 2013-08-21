define(['backbone','events', 'views/BaseView', 'template!templates/interview/interviewCreateEdit', 'modelBinder', 'bootstrapAlert', 'jqueryCookie'],
    function(Backbone, Events, BaseView, interviewCreateEditPageTemplate) {

        return BaseView.extend({

            el: '.page',

            initialize: function() {
                this._modelBinder = new Backbone.ModelBinder();
            },

            events: {
                'submit .form-horizontal': 'processForm',
                'change :input, blue :input': 'processField'
            },

            render: function() {
                this.$el.html(interviewCreateEditPageTemplate);

                this._modelBinder.bind(this.model, this.el);

                Backbone.Validation.bind(this, {
                    invalid: this.showError,
                    valid: this.removeError
                });

                return this;
            },

            postData: function() {
                this.isAuthorized();
            }
        });
    });