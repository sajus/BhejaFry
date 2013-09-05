define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if(this.get('id')){
                return Backbone.Model.gateWayUrl + '/usersList/'+ this.get('id');
            } else {
                return Backbone.Model.gateWayUrl + '/usersList';
            }
        },
        validation: {
            empid: {
                required: true,
                msg: "Please specify employeeID."
            },
            email: {
                required: true,
                pattern: 'email',
                msg: "Please specify email."
            },
            firstname: {
                required: true,
                msg: "Please specify first name."
            },
            lastname: {
                required: true,
                msg: "Please specify last name."
            },
            accesstype: {
                required: true,
                msg: "Please select employee's access type."
            }
        }
    });
});