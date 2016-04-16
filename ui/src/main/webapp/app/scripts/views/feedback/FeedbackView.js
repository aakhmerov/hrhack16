/**
 * Created by aakhmerov on 16.04.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/layout/emptyContentTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, emptyContentTemplate,Handlebars) {

    var FeedbackView = Backbone.View.extend({

        template : Handlebars.compile(emptyContentTemplate),

        initialize : function() {
//            nothing to do here
        },

        render: function() {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }

    });

    return FeedbackView;

});
