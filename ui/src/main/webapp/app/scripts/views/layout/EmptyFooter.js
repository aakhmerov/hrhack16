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
    'text!templates/layout/footerTemplate.html'  ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, footerTemplate,Handlebars) {

    var EmptyFooter = Backbone.View.extend({

        template : Handlebars.compile(footerTemplate),

        initialize : function() {
//            nothing to do here
        },

        render: function() {
            //compile handlebars template
            var data = {};
            this.$el.html(this.template(data));
            return this;
        }

    });

    return EmptyFooter;

});
