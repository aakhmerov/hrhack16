define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var AuthenticationModel = Backbone.Model.extend({
        url: 'api/authentication',

        initialize: function (options) {
            _.bindAll(this, 'cleanCookies', 'isAuthenticated', 'parse', 'update');
            this.options = $.extend(true, {}, options);
            this.fetch({wait : true});
            this.bind('destroy',this.cleanCookies);
        },

        isAuthenticated : function () {
            return this.get('authorized');
        },

        cleanCookies : function () {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },

        update: function (data) {
            this.cleanCookies();
            this.set(this.parse(data));
        },

        parse : function (data) {
            if (data && data.token) {
                document.cookie = data.token;
            }
            return data;
        }
    });

    if (!window.authentication) {
        window.authentication = new AuthenticationModel();
    }

    return window.authentication;
});
