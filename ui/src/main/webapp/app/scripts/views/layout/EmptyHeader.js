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
    'text!templates/layout/emptyHeaderTemplate.html'  ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, emptyHeaderTemplate,Handlebars) {

    var EmptyFooter = Backbone.View.extend({

        template : Handlebars.compile(emptyHeaderTemplate),

        initialize : function() {
//            nothing to do here
        },

        render: function() {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }

    });

    return EmptyFooter;

});
