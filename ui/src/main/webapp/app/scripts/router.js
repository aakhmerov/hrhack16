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
    'views/layout/PageLayoutView'
], function ($, _, Backbone,Handlebars,PageLayoutView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'showHome',
            'home': 'showHome',
            'login':'login',
            'feeling':'feeling',
            'feedback/give' : 'giveFeedback',
            'feedback/categories' : 'categories',
            // Default actions handling
            '*actions': 'defaultAction'
        },


        initialize: function () {
            _.bindAll(this, 'showHome','login','feeling', 'defaultAction', 'showPage',
                'removeCurrentView', 'setView','giveFeedback', 'categories');
        },

        showPage: function (MainView, HeaderView, FooterView) {
            this.removeCurrentView();
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
            require(['views/feedback/GiveFeedbackView'], this.showPage);
        },

        categories : function (event, attributes) {
            this.showParams = {
                el: '#page'
            };
            require(['views/feedback/CategoriesView'], this.showPage);
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
