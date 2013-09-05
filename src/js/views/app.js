define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Core = require('core'),
    Events = require('events'),
    layoutTemplate = require('template!templates/layout'),
    alerts = require('utilities/alerts'),
    AlertView = require('views/alert');

    require('jqueryCookie');

    var AppView = Backbone.View.extend({

        el: '.container',

        initialize: function () {
            Events.on("view:navigate",this.navigate,this);
            Events.on("alert:success",this.alertSuccess,this);
            Events.on("alert:error",this.alertError,this);
        },

        navigate:function(navigationData){
            Events.trigger('page:navigate', navigationData);
        },

        alertSuccess:function(messages){
            this.alert(alerts.render({type: 'success', messages: messages}));
        },

        alertError:function(messages){
            this.alert(alerts.render({type: 'error', messages: messages}));
        },

        alert: function(alertModel) {
            if($(".modal").size()!==0){
                this.alertView = new AlertView({ el: '.modal .alert-container' });
            }else{
                this.alertView = new AlertView({ el: '.alert-container' });
            }
            this.alertView.model = alertModel;
            this.alertView.render();
        },

        render: function () {
            var self = this;

            this.$el.html(layoutTemplate);

            require(['views/master/header/headerView'], function (HeaderView) {
                var headerView = Core.create(self, 'HeaderView', HeaderView,{skipAuthCheck:true});
                headerView.render();
            });

            require(['views/master/footer/footerView'], function (FooterView) {
                var footerView = Core.create(self, 'FooterView', FooterView, {appView: self,skipAuthCheck:true});
                footerView.render();
            });

        }
    });

    return AppView;
});
