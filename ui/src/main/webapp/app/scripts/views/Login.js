/**
 * Created by aakhmerov on 16.04.16.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/login.html',
  //dirty hack for handlebars loading wait
  'handlebars'
], function($, _, Backbone, login,Handlebars) {

  var LoginView = Backbone.View.extend({

    template : Handlebars.compile(login),

    initialize : function() {
//            nothing to do here
    },

    render: function() {
      //compile handlebars template
      this.$el.html(this.template());
      return this;
    }

  });

  return LoginView;

});
