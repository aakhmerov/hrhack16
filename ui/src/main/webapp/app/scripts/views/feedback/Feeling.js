/**
 * Created by kdiawara on 16.04.16.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/feedback/feeling.html',
  //dirty hack for handlebars loading wait
  'handlebars'
], function($, _, Backbone, feeling, Handlebars) {

  var FeelingView = Backbone.View.extend({

    template : Handlebars.compile(feeling),

    initialize : function() {
//            nothing to do here
      //this.model = new FeedbackModel();
    },

    render: function() {
      //compile handlebars template
      this.$el.html(this.template());
      return this;
    }

  });

  return FeelingView;

});
