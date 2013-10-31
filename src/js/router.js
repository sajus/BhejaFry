define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Core = require('core'),
        Events = require('events'),
        AppView = require('views/app');

    require('jqueryCookie');

    var AppRouter = Backbone.Router.extend({

        initialize: function() {
            Events.on('page:navigate', this._navigatePage, this);
            Events.on('redirectToAuthPage', this._navigateAdmin, this);
        },

        _navigatePage: function(navigationData) {
            this.navigate(navigationData.path, navigationData.options);
        },

        _navigateAdmin: function(options) {
            Core.create({}, 'AppView', AppView, {
                skipAuthCheck: true
            });
            this.navigate("dashboard", {
                trigger: true
            });
        },

        routes: {
            '': 'login',
            'login': 'login',
            'loginIssue': 'loginIssue',
            'dashboard': 'dashboard',
            'interview(/:id)': 'interview',
            'interviewList': 'interviewList',
            'mgnInterviewers': 'mgnInterviewers',
            'mgnInterviewersDetail(/:id)': 'mgnInterviewersDetail',
            'mgnRecruiters': 'mgnRecruiters',
            'mgnRecruitersDetail(/:id)': 'mgnRecruitersDetail',
            'usersList': 'usersList',
            'usersDetail(/:id)': 'usersDetail',
            'logout': 'logout',

            // Default - catch all
            // '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        /*** Router configuration for '' | 'login' routes ***/
        router.on('route:login', function() {
            if ($.cookie('isAuthenticated')) {
                this.navigate("dashboard", {
                    trigger: true
                });
            } else {
                require(['views/login/loginView', 'models/login/loginModel'], function(LoginPage, LoginModel) {
                    var loginModel = new LoginModel();
                    Core.create(appView, 'LoginPage', LoginPage, {
                        model: loginModel,
                        skipAuthCheck: true
                    });
                });
            }
        });

        /*** Router configuration for 'loginIssue' route ***/
        router.on('route:loginIssue', function() {
            if ($.cookie('isAuthenticated')) {
                this.navigate("dashboard", {
                    trigger: true,
                    replace: true
                });
            } else {
                require(['views/login/loginIssueView'], function(LoginIssuePage) {
                    Core.create(appView, 'LoginIssuePage', LoginIssuePage, {
                        skipAuthCheck: true
                    });
                });
            }
        });

        /*** Router configuration for 'dashboard' route ***/
        router.on('route:dashboard', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/dashboard/dashboardView'], function(DashboardPage) {
                    Core.create(appView, 'DashboardPage', DashboardPage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'interviewList' route ***/
        router.on('route:interviewList', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/interview/interviewListView'], function(InterviewListPage) {
                    Core.create(appView, 'InterviewListPage', InterviewListPage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'interview' | 'interview/:id' routes ***/
        router.on('route:interview', function(id) {
            if ($.cookie('isAuthenticated')) {
                require(['views/interview/interviewListDetailView', 'models/interview/interviewListDetailModel'], function(InterviewListPage, InterviewListDetailModel) {
                    var interviewListDetailModel = new InterviewListDetailModel();
                    Core.create(appView, 'InterviewListPage', InterviewListPage, {
                        model: interviewListDetailModel.set('id', id)
                    });
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'mgnInterviewers' route ***/
        router.on('route:mgnInterviewers', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/manage/interviewers/interviewersListView'], function(InterviewersListPage) {
                    Core.create(appView, 'InterviewersListPage', InterviewersListPage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'mgnInterviewersDetail' | 'mgnInterviewersDetail/:id' routes ***/
        router.on('route:mgnInterviewersDetail', function(id) {
            if ($.cookie('isAuthenticated')) {
                require(['views/manage/interviewers/interviewersListDetailView', 'models/manage/interviewers/interviewersListDetailModel'], function(InterviewersListDetailPage, InterviewersListDetailModel) {
                    var interviewersListDetailModel = new InterviewersListDetailModel();
                    Core.create(appView, 'InterviewersListDetailPage', InterviewersListDetailPage, {
                        model: interviewersListDetailModel.set('id', id)
                    });
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'mgnRecruiters' route ***/
        router.on('route:mgnRecruiters', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/manage/recruiters/recruitersListView'], function(RecruitersListPage) {
                    Core.create(appView, 'RecruitersListPage', RecruitersListPage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'mgnRecruitersDetail' | 'mgnRecruitersDetail(/:id)' routes ***/
        router.on('route:mgnRecruitersDetail', function(id) {
            if ($.cookie('isAuthenticated')) {
                require(['views/manage/recruiters/recruitersListDetailView', 'models/manage/recruiters/recruitersListDetailModel'], function(RecruitersListDetailPage, RecruitersListDetailModel) {
                    var recruitersListDetailModel = new RecruitersListDetailModel();
                    Core.create(appView, 'RecruitersListDetailPage', RecruitersListDetailPage, {
                        model: recruitersListDetailModel.set('id', id)
                    });
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'usersList' routes ***/
        router.on('route:usersList', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/users/usersView'], function(UsersPage) {
                    Core.create(appView, 'UsersPage', UsersPage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'usersDetail' | 'usersDetail(/:id)' routes ***/
        router.on('route:usersDetail', function(id) {
            if ($.cookie('isAuthenticated')) {
                require(['views/users/usersDetailView', 'models/users/usersListDetailModel'], function(UsersDetailPage, UsersListDetailModel) {
                    var usersListDetailModel = new UsersListDetailModel();
                    Core.create(appView, 'UsersDetailPage', UsersDetailPage, {
                        model: usersListDetailModel.set('id', id)
                    });
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'logout' routes ***/
        router.on('route:logout', function() {
            $.removeCookie('isAuthenticated');
            $.removeCookie('email');
            $.removeCookie('firstName');
            $.removeCookie('lastName');
            $.removeCookie('accesstype');
            Events.trigger("view:navigate", {
                path: "login",
                options: {
                    trigger: true,
                    skipAuthCheck: true
                }
            });
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});