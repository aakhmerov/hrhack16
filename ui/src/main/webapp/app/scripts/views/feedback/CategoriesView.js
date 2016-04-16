/**
 * Created by kdiawara on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/categories.html',
    'collections/categories/CategoriesCollection',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, categories,CategoriesCollection, Handlebars) {

    var CategoriesView = Backbone.View.extend({

        template: Handlebars.compile(categories),

        initialize: function (options) {
//            nothing to do here
            this.options = options;
            _.bindAll(this,'render');
            this.collection = new CategoriesCollection();
            $.when(this.collection.fetch()).then(this.render);
        },

        render: function () {
            this.$el.empty();
            var data = {
                "caegories" : this.collection.toJSON()
            };
            this.$el.append(this.template(data));
            return this;
        }

    });

    return CategoriesView;

});
