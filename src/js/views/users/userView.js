define(['jquery', 'underscore', 'views/BaseView', 'backbone', 'events','template!templates/users/page', 'modelValidator', 'models/user/getDesignationModel' , 'collections/users/usersCollection', 'modelBinder','bootstrap','fuelux'],
    function($, _, BaseView, Backbone, Events, userPageTemplate, Validator, DesignationModel, ModifyCollection){

    return BaseView.extend({

        initialize: function(){
            this.modelBinder = new Backbone.ModelBinder();
            this.designationModel = new DesignationModel();
            this.on("reset", this.updateView);
        },

        el: '.page',

        events: {
            'submit .form-horizontal': 'processForm',
            'blur select, change :input': 'processField',
            'click #resetForm': 'resetForm'
        },

        resetForm: function(e){
            e.preventDefault();
            this.trigger('reset');
        },

        updateView: function(){
            this.render();
            this.model.clear();
            document.getElementById('userForm').reset();
        },

        render: function () {
            var self = this;

            this.designationModel.fetch({
                async: false,
                success: function() {
                    self.$el.html(userPageTemplate({designations:self.designationModel.toJSON()}));
                    var ModifyView = require('views/users/modifyView');
                    self.modifyCollection = new ModifyCollection();
                    var modifyView = new ModifyView({collection: self.modifyCollection});
                    modifyView.render();
                }
            });

            this.modelBinder.bind(this.model, this.el);

            this.$('input#female').attr("checked", "true").trigger('change');
            this.$('input#active').attr("checked", "true").trigger('change');
            this.$('input#accessUser').attr("checked", "true").trigger('change');

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate:true
            });

            return this;
        },

        postData: function(){
            this.model.save(this.model.toJSON(), {
                success: function() {
                    Events.trigger("alert:success", [{
                        message: "User created successfully."
                    }]);
                },
                error: function() {
                    Events.trigger("alert:error", [{
                        message: "Some service error occured during data fetching."
                    }]);
                }
            });
        }
    });

});
