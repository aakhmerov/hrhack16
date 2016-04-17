/**
 * Created by kdiawara on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/categories.html',
    'collections/categories/CategoriesCollection',
    'collections/answers/AnswersCollection',
    'models/answers/AnswerModel',
    'models/answers/FeedbackModel',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, categories,CategoriesCollection,AnswersCollection,AnswerModel,FeedbackModel, Handlebars) {

    var CategoriesView = Backbone.View.extend({

        template: Handlebars.compile(categories),
        events : {
            'click .answerButton' : 'processQuestion',
            'click .preview' : 'processPreview',
            'click input[type=radio]' : 'removeFeedbackTypeError'
        },

        initialize: function (options) {
//            nothing to do here
            this.options = options;
            _.bindAll(this,'render','processQuestion','processPreview');
            if (localStorage.getItem('feedback')) {
                this.model = new FeedbackModel(JSON.parse(localStorage.getItem('feedback')));
            }
            this.collection = new CategoriesCollection();
            this.answersCollection = new AnswersCollection();
            $.when(this.collection.fetch()).then(this.render);
        },

        processQuestion : function (event) {
            event.preventDefault();

            if(this.categoryType) {
                var model = new AnswerModel();
                var answer = $(event.currentTarget).attr('answer');
                var questionId = $(event.currentTarget).attr('question');
                model.set('answer',answer);
                model.set('question',questionId);
                model.set('category',this.options.categoryId);
                if (this.categoryType == 1) {
                    model.set('text', this.$el.find('textarea[question="' + questionId + '"]').val());
                }
                this.answersCollection.add(model);
                this.$el.find('div[row-id="' + questionId + '"]').hide();
            } else {
                $('div.error-box').css('display','block');
                $('div.feedback-type').css('border','1px solid red');
                $('div.feedback-type').addClass('error')
            }

        },

        processPreview : function (event) {
            event.preventDefault();
            if(!this.answersCollection.length) {
                alert('please choose question')
            }
            //save it before navigate to the preview view!!
            var model = new FeedbackModel ();
            model.set('answers',this.answersCollection.toJSON());
            model.set('category',this.options.categoryId);
            model.save();
            //persist information in local storage
            localStorage.setItem('feedback', JSON.stringify(model.toJSON()));

            window.router.navigate("feedback/preview", {trigger: true});
        },

        removeFeedbackTypeError: function (event) {

            if(this.$el.find('div.error-box').css('display') == 'block') {
                var feedbackType = this.$el.find('div.feedback-type');
                this.$el.find('div.error-box').css('display','none');
                feedbackType.css('border','none');
                feedbackType.removeClass('error');
            }
            var value = this.$el.find('input[type=radio]:checked').val();
            this.categoryType = value;
            if (value == 0) {
                this.$el.find('textarea').hide();
            } else {
                this.$el.find('textarea').show();
            }
            return;
        },

        render: function () {
            this.$el.empty();
            var data = {
                "categoryId" : this.options.categoryId,
                "category" : this.collection.toJSON()[this.options.categoryId]
            };
            this.$el.append(this.template(data));
            Backbone.Syphon.deserialize(this, this.model.toJSON());
            return this;
        }

    });

    return CategoriesView;

});
