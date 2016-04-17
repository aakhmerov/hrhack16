/**
 * Created by kdiawara on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/preview.html',
    'text!templates/feedback/preview_email.html',
    'models/answers/FeedbackModel',
    'models/security/AuthenticationModel',
    'collections/categories/CategoriesCollection',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, feedback,preview_email, FeedbackModel,AuthenticationModel,CategoriesCollection, Handlebars) {

    var Preview = Backbone.View.extend({

        template: Handlebars.compile(feedback),
        preview_email: Handlebars.compile(preview_email),

        events: {
            'click .actionButton': 'getAction'
        },

        initialize: function () {
//            nothing to do here
            this.model = new FeedbackModel(JSON.parse(localStorage.getItem('feedback')));
            _.bindAll(this, 'getAction', 'render', 'editFeedback','getPositive','getNegative',
                'sendFeedbackmessage','calculateState','composeRepresentation');
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
            var data = this.composeRepresentation();
            this.$el.html(this.template(data));
            return this;
        },

        composeRepresentation : function () {
            var data = {
                "title" : ""
            };
            if ( this.collection.toJSON().length > 0 && this.model.get('category')){
                data = {
                    "title" : this.collection.toJSON()[this.model.get('category') - 1].name,
                    "lead" : AuthenticationModel.get('user').lead,
                    "overallState" : this.calculateState(),
                    "positive" : this.getPositive(),
                    "negative" : this.getNegative()
                };
            }
            return data;
        },

        calculateState : function () {
            var totalQuestions = this.collection.toJSON()[this.model.get('category') - 1].questions.length;
            var yesAnswers = this.getPositive();
            var noAnswers = this.getNegative();
            var yesRatio = yesAnswers.length / totalQuestions;
            var noRatio = noAnswers.length / totalQuestions;
            if ( yesRatio > noRatio) {
                return 'positive';
            } else if (yesRatio == noRatio) {
                return 'neutral';
            } else {
                return 'negative';
            }
        },

        getPositive : function () {
            return this.model.get('answers').filter(function(answer) {
                return answer.answer == 'yes';
            });
        },

        getNegative : function () {
            return this.model.get('answers').filter(function(answer) {
                return answer.answer == 'no';
            });
        },

        editFeedback: function () {
            window.router.navigate("feedback/categories/" + this.model.get('category'), {trigger: true});
        },

        sendFeedbackmessage: function () {
            this.model.set('confirmed',true);
            this.model.set('email',this.preview_email(this.composeRepresentation()));
            this.model.save();
        }

    });

    return Preview;

});

