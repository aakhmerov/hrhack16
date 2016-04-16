/**
 * Created by aakhmerov on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var AnswerModel = Backbone.Model.extend({

        initialize: function () {
            _.bindAll(this, 'parse');
        },

        parse : function (data) {
            return data;
        }

    });

    return AnswerModel;
});