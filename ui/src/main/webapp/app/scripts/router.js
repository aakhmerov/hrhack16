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
            'feedback/give' : 'giveFeedback',
            // Default actions handling
            '*actions': 'defaultAction'
        },


        initialize: function () {
            _.bindAll(this, 'showHome','login','feeling', 'defaultAction', 'showPage',
                'removeCurrentView', 'setView','giveFeedback');
        },

        showPage: function (MainView, HeaderView, FooterView) {
            this.removeCurrentView();
            if (AuthenticationModel.isAuthenticated()) {
                this.showParams.mainContent = MainView;
            } else {
                this.showParams.mainContent = this.showParams.authNotRequired ?  MainView: Login;
                this.showParams.headerContent = null;
            }
            var pageContainer = $('<div></div>').attr({id: 'page'});
            $('body').append(pageContainer);
            this.showParams.mainContent = MainView;
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
            require(['views/feedback/FeedbackView'], this.showPage);
        },

        login: function (event, attributes) {
            this.showParams = {
                el:'#page'
            };
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
            require(['views/feedback/give/GiveFeedbackView'], this.showPage);
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
