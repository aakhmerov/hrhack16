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

        events : {
            'click .give-feedback' : 'giveFeedback'
        },

        initialize : function() {
//            nothing to do here
            this.model = new FeedbackModel();
        },

        giveFeedback : function (event){
            event.preventDefault();
            window.router.navigate("feeling", {trigger: true});
        },

        render: function() {
            //compile handlebars template
            var data = {
                account : 'Employee'
            };

            this.$el.html(this.template(data));
            return this;
        }

    });

    return FeedbackView;

});
