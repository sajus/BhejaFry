define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    dashboardTemplate = require('template!templates/dashboard/dashboard');
    // ivStuReportCollection = require('collections/dashboard/')

    require('https://www.google.com/jsapi');

    var DashboardView = Backbone.View.extend({

        el: '.page',

        render: function () {
            google.load('visualization', '1', {
                'callback': this.drawChart,
                'packages': ['corechart']
            });
            this.$el.html(dashboardTemplate);
        },

        drawChart: function() {
            var data = google.visualization.arrayToDataTable([
                ["Interviews Mode", "Number"],
                ["Telephonic", 3],
                ["VC/Skype",2],
                ["Personal",5]
            ]);

            var options = {
                title: 'Interviews Mode',
                is3D: true,
                backgroundColor: '#EEE',
                stroke: '#FAFAFA'
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(data, options);
        }
    })

    return DashboardView;
});
