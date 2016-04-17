/**
 * Created by kdiawara on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/preview.html',
    'models/answers/FeedbackModel',
    'models/security/AuthenticationModel',
    'collections/categories/CategoriesCollection',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, feedback, FeedbackModel,AuthenticationModel,CategoriesCollection, Handlebars) {

    var Preview = Backbone.View.extend({

        template: Handlebars.compile(feedback),

        events: {
            'click .actionButton': 'getAction'
        },

        initialize: function () {
//            nothing to do here
            this.model = new FeedbackModel(JSON.parse(localStorage.getItem('feedback')));
            _.bindAll(this, 'getAction', 'render', 'editFeedback', 'sendFeedbackmessage');
            this.collection = new CategoriesCollection();
            $.when(this.collection.fetch()).then(this.render);
        },

        getAction: function (event) {
            event.preventDefault();
            var action = $(event.currentTarget).val();
            if (action == 'send') {
                return this.sendFeedbackmessage();
            } if (action == "edit") {
                this.editFeedback();
            }
        },

        render: function () {
            //compile handlebars template
            var data = {
                "title" : ""
            };
            if ( this.collection.toJSON().length > 0 && this.model.get('category')){
                data = {
                    "title" : this.collection.toJSON()[this.model.get('category')].name,
                    "lead" : AuthenticationModel.get('user').lead
                };
            }
            this.$el.html(this.template(data));
            return this;
        },

        editFeedback: function () {
            window.router.navigate("feedback/categories/" + this.model.get('category'), {trigger: true});
        },

        sendFeedbackmessage: function () {
            this.model.set('confirmed',true);
            this.model.save();
        }

    });

    return Preview;

});

