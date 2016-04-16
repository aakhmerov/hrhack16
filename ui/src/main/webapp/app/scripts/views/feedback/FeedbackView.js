/**
 * Created by aakhmerov on 16.04.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/feedback.html',
    'models/feedbck/FeedbackModel',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, feedback,FeedbackModel,Handlebars) {

    var FeedbackView = Backbone.View.extend({

        template : Handlebars.compile(feedback),

        initialize : function() {
//            nothing to do here
            this.model = new FeedbackModel();
        },

        render: function() {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }

    });

    return FeedbackView;

});
