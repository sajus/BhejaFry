define(function(require) {

    'use strict';
    var Backbone = require('backbone');
    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if(this.get('id')){
                return Backbone.Model.gateWayUrl + '/interviewList/'+ this.get('id');
            }else{
                return Backbone.Model.gateWayUrl + '/interviewList';
            }
        },

        validation: {
            candiateName: {
                required: true,
                msg: "Candiate name is required."
            },
            interviewDate: {
                required: true,
                msg: "Interview date is required."
            },
            mode_id: {
                required: true,
                msg: "Please specify the interview mode."
            },
            interviewer_1_id: {
                required: true,
                msg: "Please specify who conducted the interview."
            },
            interviewer_2_id: {
                required: false
            },
            recruiter_id: {
                required: true,
                msg: "Please specify who arranged the interview."
            },
            round_id: {
                required: true,
                msg: "Please specify the interview round."
            },
            status_id: {
                required: true,
                msg: "Please specify the interview status."
            },
            description: {
            	required: true,
                msg: "Please give some remarks based on your experience."
            }
        }
    });
});