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
            'click input[type=radio]' : 'removeFeedbackTypeError',
            'click .editButton' : 'showHideQuestion'
        },

        initialize: function (options) {
//            nothing to do here
            this.options = options;
            this.answeredQuestions = [];
            this.collection = new CategoriesCollection();
            _.bindAll(this,'render','processQuestion','processPreview','showHideQuestion','processActiveRow');
            if (localStorage.getItem('feedback')) {
                this.model = new FeedbackModel(JSON.parse(localStorage.getItem('feedback')));
                this.answersCollection = new AnswersCollection(this.model.get('answers'));
                var answeredQuestions = this.answeredQuestions;
                this.answersCollection.forEach(function (answer){
                    answeredQuestions.push(answer.get('question'));
                });
            } else {
                this.model = new FeedbackModel();
                this.answersCollection = new AnswersCollection();
            }
            this.categoryType = this.model.get('categoryType');
            $.when(this.collection.fetch()).then(this.render);
        },

        processQuestion : function (event) {
            event.preventDefault();

            if(this.categoryType) {



                var model = new AnswerModel();
                var answer = $(event.currentTarget).attr('answer');
                var questionId = $(event.currentTarget).attr('question');
                var questionNr = parseInt(questionId) + 1;
                var question = this.collection.toJSON()[this.options.categoryId - 1].questions[questionId];
                var problemDescription = '';
                var problemDescriptionHtlm = '';
                model.set('answer',answer);
                model.set('question',questionId);
                model.set('category',this.options.categoryId);
                model.set('tag',question.tag);
                if (this.categoryType == 1) {
                    problemDescription = this.$el.find('textarea[question="' + questionId + '"]').val();
                    if(problemDescription) {
                        problemDescriptionHtlm = '<label>Ihre Problem Beschreibung: </label><div class="description">'+problemDescription+'</div>';
                    }
                    model.set('text', problemDescription);
                }
                if (this.answeredQuestions.indexOf(questionId) < 0 ) {
                    this.answersCollection.add(model);
                }
                //save it before navigate to the preview view!!
                var fm = new FeedbackModel ();
                fm.set('answers',this.answersCollection.toJSON());
                fm.set('category',this.options.categoryId);
                fm.set('categoryType',this.categoryType);
                fm.save();
                //persist information in local storage
                localStorage.setItem('feedback', JSON.stringify(fm.toJSON()));
                this.processActiveRow(questionId,question.question, problemDescriptionHtlm, answer);
            } else {
                $('div.error-box').css('display','block');
                $('div.feedback-type').css('border','1px solid red');
                $('div.feedback-type').addClass('error')
            }

        },

        processActiveRow : function (questionId,questionText, problemDescriptionHtlm, answer) {
            var answerMaaping = {
              'yes': 'zu gestimmt',
              'skip': 'nicht relevant',
              'no': 'nicht zu gestimmt',
            };
            var questionNr = parseInt(questionId) + 1;
            var activeRow =  this.$el.find('div[row-id="' + questionId + '"]');
            var answerElement = '' +
              '<div id="'+questionId+'" class="answers-question-block">' +
                '<div>' +
                    '<label> Frage:'+ questionNr + '</label>' +
                    '<span class="textStyle">'+ questionText+'</span>' +
                '</div>'+problemDescriptionHtlm+
                '<label>Antwort: </label>' +
                '<span class="textStyle">' +answerMaaping[answer]+'</span>' +
                '<div class="text-center bottom col-xs-12">' +
                    '<button class="col-xs-3 col-xs-offset-0 btn pull-right editButton">Bearbeiten</button>'+
                '</div>' +
            '</div>';
            activeRow.after(answerElement);
            activeRow.hide();
        },

        showHideQuestion:function(event) {
            event.preventDefault();
            var rowId = $(event.currentTarget).parents('div.answers-question-block').attr('id');
            this.$el.find('div[id="' + rowId + '"]').remove();
            this.$el.find('div[row-id="' + rowId + '"]').show();
        },

        processPreview : function (event) {
            event.preventDefault();
            if(!this.answersCollection.length) {
                return alert('please choose question')
            }


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
            this.model.set('categoryType',value);
            if (value == 0) {
                this.$el.find('textarea').hide();
            } else {
                this.$el.find('textarea').show();
            }
            return;
        },

        render: function () {
            this.$el.empty();
            var data = {};
            if (this.collection.toJSON()[this.options.categoryId - 1]) {
                data = {
                    "categoryId" : this.collection.toJSON()[this.options.categoryId - 1].name,
                    "category" : this.collection.toJSON()[this.options.categoryId - 1]
                };
            }

            this.$el.append(this.template(data));
            if (this.model.get('answers') && this.collection.toJSON()[this.options.categoryId - 1]) {
                for (var i = 0; i < this.model.get('answers').length; i++) {
                    var answer = this.model.get('answers')[i];
                    this.processActiveRow(answer.question,this.collection.toJSON()[this.options.categoryId - 1].questions[answer.question].question);
                }
            }
            Backbone.Syphon.deserialize(this, this.model.toJSON());
            this.removeFeedbackTypeError();
            return this;
        }

    });

    return CategoriesView;

});
