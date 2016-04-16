/**
 * Created by aakhmerov on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var FeedbackModel = Backbone.Model.extend({

        url: 'api/services/feedback',

        initialize: function () {
            _.bindAll(this, 'parse');
        },

        parse : function (data) {
            return data;
        }

    });

    return FeedbackModel;
});
