/**
 * Created by aakhmerov on 16.04.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/give/givefeedback.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, feedback,Handlebars) {

    var GiveFeedbackView = Backbone.View.extend({

        template : Handlebars.compile(feedback),

        initialize : function() {
//            nothing to do here
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        }

    });

    return GiveFeedbackView;

});
