define(['jquery', 'underscore','views/app', 'backbone', 'core','events','jqueryCookie'], function ($, _,AppView, Backbone, Core,Events) {

    var AppRouter = Backbone.Router.extend({

        initialize:function(){
            Events.on('page:navigate', this._navigatePage, this);
            Events.on('redirectToAuthPage', this._navigateAdmin, this);
            this.currentId = null;
        },

        _navigatePage:function(navigationData){
            this.navigate(navigationData.path, navigationData.options);
        },

        _navigateAdmin:function(options){
            var appView = Core.create({}, 'AppView', AppView,{skipAuthCheck:true});
            appView.render();
            if(options!==undefined && options.targetView!==undefined){
                this.navigate("dashboard",{trigger:true});
            } else {
                this.navigate("dashboard",{trigger:true});
            }
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
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:login', function () {
            require(['views/login/loginView','models/login/loginModel'], function (LoginPage, LoginModel) {
                var loginModel = new LoginModel();
                var loginPage = Core.create(appView, 'LoginPage', LoginPage,{model:loginModel,skipAuthCheck:true});
                loginPage.render();
            });
        });

        router.on('route:dashboard', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a>");
            require(['views/dashboard/dashboardView'], function (DashboardPage) {
                var dashboardPage = Core.create(appView, 'DashboardPage', DashboardPage);
                dashboardPage.render();
            });
        });

        router.on('route:interviewList', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> Show List");
            require(['views/interview/interviewListView'], function (InterviewListPage) {
                var interviewListPage = Core.create(appView, 'InterviewListPage', InterviewListPage);
                interviewListPage.render();
            });
        });

        router.on('route:interview', function (id) {
            if(id===null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> Add New ");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> Edit Existing");
            }
            require(['views/interview/interviewListDetailView','models/interview/interviewListDetailModel'], function (InterviewListPage, InterviewListDetailModel) {
                var interviewListDetailModel = new InterviewListDetailModel();
                var interviewListPage = Core.create(appView, 'InterviewListPage', InterviewListPage, { model: interviewListDetailModel.set('id',id) });
                interviewListPage.render();
            });
        });

        router.on('route:mgnInterviewers', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> Interviewers");
            require(['views/manage/interviewers/interviewersListView'], function (InterviewersListPage) {
                var interviewersListPage = Core.create(appView, 'InterviewersListPage', InterviewersListPage);
                interviewersListPage.render();
            });
        });

        router.on('route:mgnInterviewersDetail', function (id) {
            if(id===null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnInterviewers'>Interviewers</a> <span class='divider'>/</span> Add New");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnInterviewers'>Interviewers</a> <span class='divider'>/</span> Edit Existing");
            }
            require(['views/manage/interviewers/interviewersListDetailView','models/manage/interviewers/interviewersListDetailModel'], function (InterviewersListDetailPage,InterviewersListDetailModel) {
                var interviewersListDetailModel = new InterviewersListDetailModel();
                var interviewersListDetailPage = Core.create(appView, 'InterviewersListDetailPage', InterviewersListDetailPage, { model: interviewersListDetailModel.set('id',id) });
                interviewersListDetailPage.render();
            });
        });

        router.on('route:mgnRecruiters', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> Recruiters");
            require(['views/manage/recruiters/recruitersListView'], function (RecruitersListPage) {
                var recruitersListPage = Core.create(appView, 'RecruitersListPage', RecruitersListPage);
                recruitersListPage.render();
            });
        });

        router.on('route:mgnRecruitersDetail', function (id) {
            if(id===null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnRecruiters'>Recruiters</a> <span class='divider'>/</span> Add New");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Manage <i class='icon-random'></i> <a href='#mgnRecruiters'>Recruiters</a> <span class='divider'>/</span> Edit Existing");
            }
            require(['views/manage/recruiters/recruitersListDetailView','models/manage/recruiters/recruitersListDetailModel'], function (RecruitersListDetailPage,RecruitersListDetailModel) {
                var recruitersListDetailModel = new RecruitersListDetailModel();
                var recruitersListDetailPage = Core.create(appView, 'RecruitersListDetailPage', RecruitersListDetailPage, { model: recruitersListDetailModel.set('id',id) });
                recruitersListDetailPage.render();
            });
        });

        router.on('route:usersList', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Show List");
            require(['views/users/usersView'], function (UsersPage) {
                var usersPage = Core.create(appView, 'UsersPage', UsersPage);
                usersPage.render();
            });
        });

        router.on('route:usersDetail', function (id) {
            if(id===null) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Add New");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>User Operations <span class='divider'>/</span> Edit Existing");
            }
            require(['views/users/usersDetailView','models/users/usersListDetailModel'], function (UsersDetailPage,UsersListDetailModel) {
                var usersListDetailModel = new UsersListDetailModel();
                var usersDetailPage = Core.create(appView, 'UsersDetailPage', UsersDetailPage, { model: usersListDetailModel.set('id',id) });
                usersDetailPage.render();
            });
        });

        router.on('route:logout', function () {
            $.removeCookie('isAuthenticated');
            Events.trigger("view:navigate", {
                path: "login",
                options: {
                    trigger: true,
                    skipAuthCheck:true
                }
            });
        });

        router.on('route:defaultAction', function (actions) {
            require(['views/defaultAction/defaultAction'], function (DefaultAction) {
                var defaultAction = Core.create(appView, 'DefaultPage', DefaultAction);
                defaultAction.render();
            });
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
