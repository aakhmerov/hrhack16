define([
    'jquery',
    'underscore',
    'backbone',
    'models/answers/AnswerModel'
], function ($, _, Backbone, AnswerModel) {

    var AnswersCollection = Backbone.Collection.extend({
        model: AnswerModel,

        initialize: function(options) {
            _.bindAll(this, 'parse');
        },

        parse: function (data) {
            return data;
        }
    });

    return AnswersCollection;
});