define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if(this.get('id')){
                //return Backbone.Model.gateWayUrl + '/interviewList/'+ this.get('id');
            } else {
                //return Backbone.Model.gateWayUrl + '/interviewList';
            }
        },
        validation: {
            employeeId: {
                required: true,
                msg: "Please specify employeeID."
            },
            email: {
                required: true,
                msg: "Please specify email."
            },
            firstName: {
                required: true,
                msg: "Please specify first name."
            },
            lastName: {
                required: true,
                msg: "Please specify last name."
            },
            accessType: {
                required: true,
                msg: "Please select employee's access type."
            }
        }
    });
});