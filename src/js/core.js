define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Globals = require('globals'),
        Events = require('events'),
        LoginView = require('views/login/loginView'),
        LoginModel = require('models/login/loginModel'),
        globals = {};

    require('jqueryCookie');

    _.extend(Backbone.Model, {
        gateWayUrl: "http://" + document.domain + ":" + Globals.gateWayPort
    });

    $.ajax({
        url: Backbone.Model.gateWayUrl + '/interviewer'
    }).done(function(interviewer) {
        globals.interviewer_list = interviewer;
    });

    $.ajax({
        url: Backbone.Model.gateWayUrl + '/mode'
    }).done(function(mode) {
        globals.interviewmode_list = mode;
    });

    $.ajax({
        url: Backbone.Model.gateWayUrl + '/recruiter'
    }).done(function(recruiter) {
        globals.recruiter_list = recruiter;
    });

    $.ajax({
        url: Backbone.Model.gateWayUrl + '/rounds'
    }).done(function(rounds) {
        globals.interviewrounds_list = rounds;
    });

    $.ajax({
        url: Backbone.Model.gateWayUrl + '/status'
    }).done(function(status) {
        globals.interviewstatus_list = status;
    });

    // var views = {},
    //     user = ['UserAssesmentPage', 'DashboardPage', 'NewSurvey', 'SurveyDetailed', 'SurveyUserDetailed', 'ListSurvey', 'userPage'];

    var create = function(context, viewName, View, options) {
        var views = {}, view;
        /*
            View clean up isn't actually implemented yet,
            but will simply call .clean, .remove and .unbind
        */
        if (typeof views[viewName] !== 'undefined') {
            views[viewName].undelegateEvents();
            if (typeof views[viewName].clean === 'function') {
                views[viewName].clean();
            }
        }
        var skipAuthCheck = false;
        if (options !== undefined) {
            if (options.skipAuthCheck) {
                skipAuthCheck = true;
            }
        }
        var accesslevel = $.cookie('accesslevel');
        if (!$.cookie('isAuthenticated') && !skipAuthCheck) {
            var loginModel = new LoginModel();
            view = new LoginView({
                model: loginModel,
                authorizationFailed: !skipAuthCheck,
                targetView: View,
                targetOptions: options
            });
        } else {
            view = new View(options);
        }

        views[viewName] = view;

        if (context !== undefined) {
            if (typeof context.children === 'undefined') {
                context.children = {};
                context.children[viewName] = view;
            } else {
                context.children[viewName] = view;
            }
        }

        return view;
    };

    return {
        create: create,
        globals: globals
    };


});