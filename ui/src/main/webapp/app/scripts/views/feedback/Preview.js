/**
 * Created by kdiawara on 16.04.16.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/feedback/preview.html',
  //dirty hack for handlebars loading wait
  'handlebars'
], function($, _, Backbone, feedback, Handlebars) {

  var Preview = Backbone.View.extend({

    template : Handlebars.compile(feedback),

    events : {
      'click .actionButton' : 'getAction'
    },

    initialize : function() {
//            nothing to do here
//      this.model = new FeedbackModel();
      _.bindAll(this, 'getAction', 'render', 'editFeedback', 'sendFeedbackmessage');
    },

    getAction : function (event){
      event.preventDefault();
      var action = this.$el.find('button[name=action]').val();
      if(action == 'send') {
        return this.sendFeedbackmessage();
      }
    },

    render: function() {
      //compile handlebars template
      this.$el.html(this.template());
      return this;
    },

    editFeedback: function() {
      console.log('editFeedback');
    },

    sendFeedbackmessage: function () {
      console.log('sendFeedback');
    }

  });

  return Preview;

});
