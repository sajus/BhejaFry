define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if(this.get('id')){
                return Backbone.Model.gateWayUrl + '/recruiter/'+ this.get('id');
            } else {
                return Backbone.Model.gateWayUrl + '/recruiter';
            }
        },
        validation: {
            employeeId: {
                required: true,
                msg: "Please specify employeeID."
            },
            firstName: {
                required: true,
                msg: "Please specify first name."
            },
            lastName: {
                required: true,
                msg: "Please specify last name."
            }
        }
    });
});