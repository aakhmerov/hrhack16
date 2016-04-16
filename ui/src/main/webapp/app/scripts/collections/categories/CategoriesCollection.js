/**
 * Created by aakhmerov on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/categories/CategoryModel'
], function ($, _, Backbone, CategoryModel) {

    var CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel,
        url : 'data/categories.json',

        initialize: function(options) {
            _.bindAll(this, 'parse');
        },

        parse: function (data) {
            return data;
        }
    });

    return CategoriesCollection;
});