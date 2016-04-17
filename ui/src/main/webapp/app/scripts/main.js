/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        syphon : {
            deps : ['backbone']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        syphon : '../bower_components/backbone.syphon/lib/backbone.syphon',
        underscore: '../bower_components/lodash/dist/lodash',
        handlebars : '../bower_components/handlebars/handlebars',
        text : '../bower_components/requirejs-text/text',
        bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
    }
});

require([
    'backbone',
    'handlebars',
    'router',
    'syphon'
], function (Backbone,Handlebars, Router) {
    Router.initialize();

    Handlebars.registerHelper("inc", function(value, options)
    {
        return parseInt(value) + 1;
    });
});
