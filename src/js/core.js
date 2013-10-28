define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Globals = require('globals'),
        Events = require('events'),
        LoginView = require('views/login/loginView'),
        LoginModel = require('models/login/loginModel'),
        InterviewerCollection = require('collections/interview/interviewerCollection'),
        ModeCollection = require('collections/interview/modeCollection'),
        RecruiterCollection = require('collections/interview/recruiterCollection'),
        RoundsCollection = require('collections/interview/roundsCollection'),
        StatusCollection = require('collections/interview/statusCollection');

    require('jqueryCookie');

    _.extend(Backbone.Model, {
        gateWayUrl: "http://" + document.domain + ":" + Globals.gateWayPort
    });

    var globals = {},
        interviewerCollection = new InterviewerCollection(),
        modeCollection = new ModeCollection(),
        recruiterCollection = new RecruiterCollection(),
        roundsCollection = new RoundsCollection(),
        statusCollection = new StatusCollection();

    interviewerCollection.fetch({
        success: function() {
            globals.interviewer_list = interviewerCollection.toJSON();
        }
    });

    modeCollection.fetch({
        success: function() {
            globals.interviewmode_list = modeCollection.toJSON();
        }
    });
    recruiterCollection.fetch({
        success: function() {
            globals.recruiter_list = recruiterCollection.toJSON();
        }
    });
    roundsCollection.fetch({
        success: function() {
            globals.interviewrounds_list = roundsCollection.toJSON();
        }
    });
    statusCollection.fetch({
        success: function() {
            globals.interviewstatus_list = statusCollection.toJSON();
        }
    });

    var views = {},
        user = ['UserAssesmentPage', 'DashboardPage', 'NewSurvey', 'SurveyDetailed', 'SurveyUserDetailed', 'ListSurvey', 'userPage'];

    var create = function(context, name, View, options) {
        /*
            View clean up isn't actually implemented yet,
            but will simply call .clean, .remove and .unbind
        */
        if (typeof views[name] !== 'undefined') {
            views[name].undelegateEvents();
            if (typeof views[name].clean === 'function') {
                views[name].clean();
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
            var loginModel = new LoginModel(),
                view = new LoginView({
                    model: loginModel,
                    authorizationFailed: !skipAuthCheck,
                    targetView: View,
                    targetOptions: options
                });
        } else {
            var view = new View(options);
        }

        views[name] = view;

        if (context !== undefined) {
            if (typeof context.children === 'undefined') {
                context.children = {};
                context.children[name] = view;
            } else {
                context.children[name] = view;
            }
        }

        return view;
    };

    return {
        create: create,
        globals: globals
    };


});