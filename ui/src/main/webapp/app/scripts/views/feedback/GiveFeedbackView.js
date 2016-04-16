/**
 * Created by aakhmerov on 16.04.16.
 */

define([
    'jquery',
    '../../../bower_components/underscore/underscore',
    'backbone',
    'text!templates/feedback/givefeedback.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, feedback,Handlebars) {

    var GiveFeedbackView = Backbone.View.extend({

        template : Handlebars.compile(feedback),

        events : {
            'click .category' : 'getCategories',
            'click input[type=radio]' : 'removeFeedbackTypeError'
        },

        initialize : function() {
//            nothing to do here
        },

        getCategories: function (event) {
            event.preventDefault();

            var categoryType = $('input[name=type]:checked', '.feedback-type').val();
            if(categoryType != undefined){
                var categoryNumber = parseInt(event.target.value);
                window.router.navigate("feedback/categories/"+categoryNumber, {trigger: true});
            } else {
                $('div.feedback-type').css('border','1px solid red');
                $('div.error-box').css('display','block');
                console.log('no feedback type is given')
            }
        },

        removeFeedbackTypeError: function () {
            if($('div.error-box').css('display') == 'block') {
                $('div.error-box').css('display','none');
                $('div.feedback-type').css('border','none');
            }
            return;
        },


        render: function() {
            this.$el.html(this.template());
            return this;
        }

    });

    return GiveFeedbackView;

});
