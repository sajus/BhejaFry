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
            }else{
                this.navigate("dashboard",{trigger:true});
            }
        },

        routes: {
            '':'login',
            'login': 'login',
            'dashboard':'dashboard',
            'user': 'user',
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
            require(['views/dashboard/dashboardView', 'collections/dashboard/dashboardCollection'], function (DashboardPage, DashboardCollection) {
                var dashboardCollection = new DashboardCollection();
                var dashboardPage = Core.create(appView, 'DashboardPage', DashboardPage, { collection: dashboardCollection });
                dashboardPage.render();
            });
        });

        router.on('route:user', function () {
            require(['views/users/userView','views/users/modifyView','models/user/createUserModel'], function (userPage, modifyUserPage, CreateUserModel) {
                var createUserModel = new CreateUserModel();
                var userPage = Core.create(appView, 'userPage', userPage, { model: createUserModel });
                userPage.render();
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
