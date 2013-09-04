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
            '':'login',
            'login': 'login',
            'dashboard':'dashboard',
            'interviewList':'interviewList',
            'interview': 'interview',
            'interview/:id': 'interview',
            'logout':'logout',
            'accessForbiden':'accessForbiden',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:dashboard', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a>");
            require(['views/dashboard/dashboardView'], function (DashboardPage) {
                var dashboardPage = Core.create(appView, 'DashboardPage', DashboardPage);
                dashboardPage.render();
            });
        });

        router.on('route:interviewList', function () {
            $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> <i class='icon-list'></i> <a href='#interviewList'>Show List</a>");
            require(['views/interviewList/interviewListView'], function (InterviewListPage) {
                var interviewListPage = Core.create(appView, 'InterviewListPage', InterviewListPage);
                interviewListPage.render();
            });
        });

        router.on('route:interview', function (id) {
            if(id===undefined) {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> <i class='icon-file'></i> <a href='#interviewList'>Add New</a>");
            } else {
                $('.sidemap .breadcrumb li').html("<i class='icon-th-large'></i> <a href='#'>Dashboard</a><span class='divider'>/</span>Interview Operations <span class='divider'>/</span> <i class='icon-file'></i> <a href='#interviewList/"+id+"'>Show List</a>");
            }
            require(['views/interview/interviewCreateEditView','models/interview/interviewCreateEditModel'], function (InterviewPage, InterviewModel) {
                var interviewModel = new InterviewModel();
                var interviewPage = Core.create(appView, 'InterviewPage', InterviewPage, { model: interviewModel.set('id',id) });
                interviewPage.render();
            });
        });

        router.on('route:login', function () {
            require(['views/login/loginView','models/login/loginModel'], function (LoginPage, LoginModel) {
                var loginModel = new LoginModel();
                var loginPage = Core.create(appView, 'LoginPage', LoginPage,{model:loginModel,skipAuthCheck:true});
                loginPage.render();
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
