/**
 * Created by aakhmerov on 16.04.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/givefeedback.html',
    'collections/categories/CategoriesCollection',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, feedback,CategoriesCollection,Handlebars) {

    var GiveFeedbackView = Backbone.View.extend({

        template : Handlebars.compile(feedback),

        initialize: function () {
//            nothing to do here
            _.bindAll(this,'render');
            this.collection = new CategoriesCollection();
            $.when(this.collection.fetch()).then(this.render);
        },

        render: function () {
            this.$el.empty();
            var data = {
                "categories" : this.collection.toJSON()
            };
            this.$el.append(this.template(data));
            return this;
        }

    });

    return GiveFeedbackView;

});
