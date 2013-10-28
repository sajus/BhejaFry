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
            this.currentId = null;
        },

        _navigatePage: function(navigationData) {
            this.navigate(navigationData.path, navigationData.options);
        },

        _navigateAdmin: function(options) {
            var appView = Core.create({}, 'AppView', AppView, {
                skipAuthCheck: true
            });
            appView.render();
            this.navigate("dashboard", {
                trigger: true
            });
        },

        routes: {
            '': 'login',
            'login': 'login',
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

        router.on('route:login', function() {
            if ($.cookie('isAuthenticated')) {
                this.navigate("dashboard", {
                    trigger: true
                });
            } else {
                require(['views/login/loginView', 'models/login/loginModel'], function(LoginPage, LoginModel) {
                    var loginModel = new LoginModel();
                    var loginPage = Core.create(appView, 'LoginPage', LoginPage, {
                        model: loginModel,
                        skipAuthCheck: true
                    });
                    loginPage.render();
                });
            }
        });

        router.on('route:dashboard', function() {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a>");
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

        router.on('route:interviewList', function() {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> Show List");
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

        router.on('route:interview', function(id) {
            if (id === null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> Add New ");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> Edit Existing");
            }
            if ($.cookie('isAuthenticated')) {
                require(['views/interview/interviewListDetailView', 'models/interview/interviewListDetailModel'], function(InterviewListPage, InterviewListDetailModel) {
                    var interviewListDetailModel = new InterviewListDetailModel();
                    var interviewListPage = Core.create(appView, 'InterviewListPage', InterviewListPage, {
                        model: interviewListDetailModel.set('id', id)
                    });
                    interviewListPage.render();
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        router.on('route:mgnInterviewers', function() {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> Interviewers");
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

        router.on('route:mgnInterviewersDetail', function(id) {
            if (id === null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnInterviewers'>Interviewers</a> <span class='divider'>/</span> Add New");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnInterviewers'>Interviewers</a> <span class='divider'>/</span> Edit Existing");
            }
            if ($.cookie('isAuthenticated')) {
                require(['views/manage/interviewers/interviewersListDetailView', 'models/manage/interviewers/interviewersListDetailModel'], function(InterviewersListDetailPage, InterviewersListDetailModel) {
                    var interviewersListDetailModel = new InterviewersListDetailModel();
                    var interviewersListDetailPage = Core.create(appView, 'InterviewersListDetailPage', InterviewersListDetailPage, {
                        model: interviewersListDetailModel.set('id', id)
                    });
                    interviewersListDetailPage.render();
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        router.on('route:mgnRecruiters', function() {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> Recruiters");
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

        router.on('route:mgnRecruitersDetail', function(id) {
            if (id === null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnRecruiters'>Recruiters</a> <span class='divider'>/</span> Add New");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnRecruiters'>Recruiters</a> <span class='divider'>/</span> Edit Existing");
            }
            if ($.cookie('isAuthenticated')) {
                require(['views/manage/recruiters/recruitersListDetailView', 'models/manage/recruiters/recruitersListDetailModel'], function(RecruitersListDetailPage, RecruitersListDetailModel) {
                    var recruitersListDetailModel = new RecruitersListDetailModel();
                    var recruitersListDetailPage = Core.create(appView, 'RecruitersListDetailPage', RecruitersListDetailPage, {
                        model: recruitersListDetailModel.set('id', id)
                    });
                    recruitersListDetailPage.render();
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        router.on('route:usersList', function() {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Show List");
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

        router.on('route:usersDetail', function(id) {
            if (id === null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Add New");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Edit Existing");
            }
            if ($.cookie('isAuthenticated')) {
                require(['views/users/usersDetailView', 'models/users/usersListDetailModel'], function(UsersDetailPage, UsersListDetailModel) {
                    var usersListDetailModel = new UsersListDetailModel();
                    var usersDetailPage = Core.create(appView, 'UsersDetailPage', UsersDetailPage, {
                        model: usersListDetailModel.set('id', id)
                    });
                    usersDetailPage.render();
                });
            } else {
                this.navigate("login", {
                    trigger: true
                });
            }
        });

        router.on('route:logout', function() {
            $.removeCookie('isAuthenticated');
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