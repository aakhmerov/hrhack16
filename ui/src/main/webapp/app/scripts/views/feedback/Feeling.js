/**
 * Created by kdiawara on 16.04.16.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/feedback/feeling.html',
    'models/feeling/FeelingModel',
  //dirty hack for handlebars loading wait
  'handlebars'
], function($, _, Backbone, feeling,FeelingModel, Handlebars) {

  var FeelingView = Backbone.View.extend({

    template : Handlebars.compile(feeling),

    events : {
      'click .next' : 'categories'
    },


    initialize : function() {
//            nothing to do here
      //this.model = new FeedbackModel();
      _.bindAll(this,'render','categories');
    },

    categories : function(event) {
      event.preventDefault();
      this.model = new FeelingModel();
      this.model.set('type',this.$el.find("#feelingType").val());
      this.model.set('moment',this.$el.find("#feelingMoment").val());
      this.model.save();
      window.router.navigate("feedback/give", {trigger: true});
    },

    render: function() {
      //compile handlebars template
      this.$el.html(this.template());
      return this;
    }

  });

  return FeelingView;

});
