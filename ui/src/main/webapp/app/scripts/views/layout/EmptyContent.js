/**
 *
 * User: dervish
 * Date: 12/12/12
 * Time: 1:45 PM
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/layout/emptyContentTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, emptyContentTemplate,Handlebars) {

    var EmptyContent = Backbone.View.extend({

        template : Handlebars.compile(emptyContentTemplate),

        initialize : function() {
//            nothing to do here
        },

        render: function() {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }

    });

    return EmptyContent;

});
