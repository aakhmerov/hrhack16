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

        events : {
            'click .category' : 'getCategories'
        },

        initialize : function() {
//            nothing to do here
            _.bindAll(this,'render');
            this.collection = new CategoriesCollection();
            $.when(this.collection.fetch()).then(this.render);
        },

        getCategories: function (event) {
            event.preventDefault();
            var categoryNumber = parseInt(event.target.value);
            window.router.navigate("feedback/categories/"+categoryNumber, {trigger: true});
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
