/**
 * Created by aakhmerov on 16.04.16.
 */
// Filename: router.js
/**
 * Base router of the application
 * all pages urls should be aggregated here and actions
 * taken appropriately
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/security/AuthenticationModel',
    'views/Login',
    'views/layout/PageLayoutView'
], function ($, _, Backbone,Handlebars,AuthenticationModel,Login,PageLayoutView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'showHome',
            'home': 'showHome',
            'login':'login',
            'feeling':'feeling',
            'dashboard' : 'showDashboard',
            'feedback/give' : 'giveFeedback',
            'feedback/categories/:id' : 'categories',
            'feedback/preview' : 'preview',
            // Default actions handling
            '*actions': 'defaultAction'
        },


        initialize: function () {
            _.bindAll(this, 'showHome','login','feeling', 'defaultAction', 'showPage',
                'removeCurrentView', 'setView','giveFeedback', 'categories', 'preview','showDashboard');
        },

        showPage: function (MainView, HeaderView, FooterView) {
            this.removeCurrentView();
            if (AuthenticationModel.isAuthenticated()) {
                this.showParams.mainContent = MainView;
            } else {
                if (MainView != Login) {
                    window.router.navigate("login", {trigger: true, replace: true});
                } else {
                    this.showParams.mainContent = MainView;
                }
            }
            var pageContainer = $('<div></div>').attr({id: 'page'});
            $('body').append(pageContainer);
            var page = new PageLayoutView(this.showParams);
            page.render();
            this.setView(page);
        },

        removeCurrentView: function () {
            if (!_.isEmpty(this.view)) {
                this.view.undelegateEvents();
                this.view.remove();
                this.view.$el.empty();
            }
            this.view = null;
        },

        setView: function (view) {
            this.view = view;
        },

        showHome: function (event, attributes) {
            this.showParams = {
                el: '#page'
            };
            if (AuthenticationModel.get('user') && AuthenticationModel.get('user').role == 'Teamlead') {
                window.router.navigate("dashboard", {trigger: true, replace: true});
            } else {
                require(['views/feedback/FeedbackView'], this.showPage);
            }
        },

        login: function (event, attributes) {
            this.showParams = {
                el:'#page'
            };
            localStorage.removeItem('feedback');
            require(['views/Login'], this.showPage);
        },

        feeling: function () {
            this.showParams = {
                el:'#page'
            };
            require(['views/feedback/Feeling'], this.showPage);
        },

        giveFeedback : function (event, attributes) {
            this.showParams = {
                el: '#page'
            };
            require(['views/feedback/GiveFeedbackView'], this.showPage);
        },

        categories : function (id) {
            this.showParams = {
                el: '#page',
                mainContentOptions: {
                    categoryId: id
                }
            };
            require(['views/feedback/CategoriesView'], this.showPage);
        },

        preview: function () {
            this.showParams = {
                el: '#page'
            };
            require(['views/feedback/Preview'], this.showPage);
        },

        showDashboard : function (){
            this.showParams = {
                el: '#page'
            };
            require(['views/management/Dashboard'], this.showPage);
        },

        defaultAction: function () {
            console.log('default');
        }
    });

    var initialize = function () {

        var app_router = new AppRouter;
        window.router = app_router;
        Backbone.history.start();

    };
    return {
        initialize: initialize
    };
});
