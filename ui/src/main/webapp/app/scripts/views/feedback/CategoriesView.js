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
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, categories,CategoriesCollection,AnswersCollection,AnswerModel, Handlebars) {

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
            this.collection = new CategoriesCollection();
            this.answersCollection = new AnswersCollection();
            $.when(this.collection.fetch()).then(this.render);
        },

        processQuestion : function (event) {
            event.preventDefault();

            if(this.categoryType && this.categoryType == 0) {
                var model = new AnswerModel();
                var answer = $(event.currentTarget).attr('answer');
                var questionId = $(event.currentTarget).attr('question');
                model.set('answer',answer);
                model.set('questionId',questionId);
                model.set('category',this.options.categoryId);
                this.answersCollection.add(model);
                this.$el.find('div[row-id="' + questionId + '"]').hide();
            } else {
                $('div.error-box').css('display','block');
                $('div.feedback-type').css('border','1px solid red');
            }

        },

        processPreview : function (event) {
            event.preventDefault();
            console.log(this.answersCollection.toJSON());
        },

        removeFeedbackTypeError: function (event) {
            
            if(this.$el.find('div.error-box').css('display') == 'block') {
                this.$el.find('div.error-box').css('display','none');
                this.$el.find('div.feedback-type').css('border','none');
            }
            var value = this.$el.find('input[type=radio]:checked').val();
            this.categoryType = value;
            if (value == 1) {
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
            return this;
        }

    });

    return CategoriesView;

});
