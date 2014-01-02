define(function(require) {
    'use strict';

    var $ = require('jquery'),
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

        _navigateAdmin: function() {
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
            'interview(/:email)': 'interview',
            'interviewList': 'interviewList',
            'mgnInterviewers': 'mgnInterviewers',
            'mgnInterviewersDetail(/:id)': 'mgnInterviewersDetail',
            'mgnRecruiters': 'mgnRecruiters',
            'mgnRecruitersDetail(/:id)': 'mgnRecruitersDetail',
            'usersList': 'usersList',
            'usersDetail(/:id)': 'usersDetail',
            'settings': 'settings',
            'logout': 'logout',

            // Default - catch all
            '*actions': 'notFound'
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
                require(['views/login/loginView'], function(LoginPage) {
                    Core.create(appView, 'LoginPage', LoginPage, {
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

        /*** Router configuration for 'interview' | 'interview/:email' routes ***/
        router.on('route:interview', function(email) {
            if ($.cookie('isAuthenticated')) {
                require(['views/interview/interviewListDetailView', 'models/interview/interviewListDetailModel'], function(InterviewListPage, InterviewListDetailModel) {
                    var interviewListDetailModel = new InterviewListDetailModel();
                    Core.create(appView, 'InterviewListPage', InterviewListPage, {
                        model: interviewListDetailModel.set('email', email)
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
                require(['views/manage/interviewers/interviewersListDetailView'], function(InterviewersListDetailPage) {
                    Core.create(appView, 'InterviewersListDetailPage', InterviewersListDetailPage, {
                        'id': id
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
                require(['views/manage/recruiters/recruitersListDetailView'], function(RecruitersListDetailPage) {
                    Core.create(appView, 'RecruitersListDetailPage', RecruitersListDetailPage, {
                        'id': id
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
                require(['views/users/usersDetailView'], function(UsersDetailPage) {
                    Core.create(appView, 'UsersDetailPage', UsersDetailPage, {
                        'id': id
                    });
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'settings' route ***/
        router.on('route:settings', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/settings/settingsView'], function(SettingsPage) {
                    Core.create(appView, 'SettingsPage', SettingsPage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'logout' routes ***/
        router.on('route:logout', function() {
            if ($.cookie('isAuthenticated')) {
                $.removeCookie('isAuthenticated');
                $.removeCookie('email');
                $.removeCookie('username');
                $.removeCookie('roles');
                $.ajax({
                    url: Backbone.Model.gateWayUrl + '/logout'
                }).done(function() {
                    Events.trigger("view:navigate", {
                        path: "login",
                        options: {
                            trigger: true
                        }
                    });
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        /*** Router configuration for 'notFound' routes ***/
        router.on('route:notFound', function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/statusCodes/notFound'], function(StatusCodePage) {
                    Core.create(appView, 'StatusCodePage', StatusCodePage);
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});