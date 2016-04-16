/**
 * Created by aakhmerov on 16.04.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/management/dashboard.html',
    'models/management/DashboardModel',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, feedback,DashboardModel,Handlebars) {

    var Dashboard = Backbone.View.extend({

        template : Handlebars.compile(feedback),

        events : {
            'click .category' : 'getCategories'
        },

        initialize : function() {
//            nothing to do here
            _.bindAll(this,'render');
            this.model = new DashboardModel();
            $.when(this.model.fetch()).then(this.render);
        },

        render: function () {
            this.$el.empty();
            var data = {
            };
            this.$el.append(this.template(data));
            return this;
        }

    });

    return Dashboard;

});