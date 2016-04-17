/**
 * Created by aakhmerov on 17.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var AnswerModel = Backbone.Model.extend({
        defaults : {
            "confirmed" : false
        },

        url : 'api/answers',

        initialize: function () {
            _.bindAll(this, 'parse');
        },

        parse : function (data) {
            return data;
        }

    });

    return AnswerModel;
});