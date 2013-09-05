define(['backbone',
    'events',
    'globals',
    'views/login/loginView',
    'models/login/loginModel',
    'views/defaultAction/accessForbiden',
    'collections/interview/interviewerCollection',
    'collections/interview/modeCollection',
    'collections/interview/recruiterCollection',
    'collections/interview/roundsCollection',
    'collections/interview/statusCollection',
    'underscore',
    'jqueryCookie'
    ],
    function(Backbone,
        Events,
        Globals,
        LoginView,
        LoginModel,
        AccessForbidenView,
        InterviewerCollection,
        ModeCollection,
        RecruiterCollection,
        RoundsCollection,
        StatusCollection
        ){

    _.extend(Backbone.Model , {
        gateWayUrl:"http://"+document.domain+":"+Globals.gateWayPort
    });

    var globals = {};

    var interviewerCollection = new InterviewerCollection();
    var modeCollection = new ModeCollection();
    var recruiterCollection = new RecruiterCollection();
    var roundsCollection = new RoundsCollection();
    var statusCollection = new StatusCollection();

    interviewerCollection.fetch({
        success:function(){
            globals.interviewer_list =  interviewerCollection.toJSON();
        }
    });
    modeCollection.fetch({
        success:function(){
            globals.interviewmode_list =  modeCollection.toJSON();
        }
    });
    recruiterCollection.fetch({
        success:function(){
            globals.recruiter_list =  recruiterCollection.toJSON();
        }
    });
    roundsCollection.fetch({
        success:function(){
            globals.interviewrounds_list =  roundsCollection.toJSON();
        }
    });
    statusCollection.fetch({
        success:function(){
            globals.interviewstatus_list =  statusCollection.toJSON();
        }
    });

    var views = {},
        user = ['UserAssesmentPage', 'DashboardPage', 'NewSurvey', 'SurveyDetailed', 'SurveyUserDetailed', 'ListSurvey', 'userPage'];

    var create = function (context, name, View, options) {
        /*
            View clean up isn't actually implemented yet,
            but will simply call .clean, .remove and .unbind
        */
        if(typeof views[name] !== 'undefined') {
            views[name].undelegateEvents();
            if(typeof views[name].clean === 'function') {
                views[name].clean();
            }
        }
        var skipAuthCheck=false;
        if(options!==undefined){
            if(options.skipAuthCheck){
                skipAuthCheck=true;
            }
        }
        var accesslevel = $.cookie('accesslevel');
        if(!$.cookie('isAuthenticated') && !skipAuthCheck){
            var loginModel=new LoginModel(),
            view = new LoginView({model:loginModel,authorizationFailed:!skipAuthCheck,targetView:View,targetOptions:options});
        } else if((accesslevel === "admin" && name === "userPage") || (accesslevel === "user" && _.contains(user, name))){
            view = new AccessForbidenView();
            Events.trigger("view:navigate", {
                path: "accessForbiden",
                options: {
                    trigger: true
                }
            });
        } else {
            var view = new View(options);
        }

        views[name] = view;

        if(typeof context.children === 'undefined'){
            context.children = {};
            context.children[name] = view;
        } else {
            context.children[name] = view;
        }

        Events.trigger('viewCreated');
        return view;
    };

    return {
        create: create,
        globals:globals
    };


});
