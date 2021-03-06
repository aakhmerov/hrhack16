/**
 * Created by aakhmerov on 16.04.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/security/AuthenticationModel',
    'text!templates/login.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone,AuthenticationModel, login, Handlebars) {

    var LoginView = Backbone.View.extend({

        template: Handlebars.compile(login),

        events : {
            'click .login' : 'handleLogin'
        },

        feedbackPage : 'home',

        initialize: function () {
//            nothing to do here
            _.bindAll(this,'handleLogin','handleAuthenticationResult','handleAuthenticationError',
                'navigateHome','render');
        },
        handleLogin : function (event){
            event.preventDefault();
            var data = {
                'username' : this.$el.find('.username').val(),
                'password' : this.$el.find('.password').val()
            };
            AuthenticationModel.set(data);
            AuthenticationModel.bind('error',this.handleAuthenticationError);
            $.when(AuthenticationModel.save()).then(this.handleAuthenticationResult);
        },

        handleAuthenticationResult : function () {
            console.log('returned from authorization');
            if (AuthenticationModel.isAuthenticated()) {
                this.$el.find('.error-msg').hide();
                this.navigateHome();
            }
        },

        handleAuthenticationError : function () {
            this.$el.find('.error-msg').show();
        },

        navigateHome: function() {
            if (AuthenticationModel.get('user') && AuthenticationModel.get('user').role == 'Teamlead') {
                window.router.navigate("dashboard", {trigger: true, replace: true});
            } else {
                window.router.navigate(this.feedbackPage, {trigger: true, replace: true});
            }
        },

        render: function () {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }

    });

    return LoginView;

});
