define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if(this.get('id')){
                return Backbone.Model.gateWayUrl + '/interviewer/'+ this.get('id');
            } else {
                return Backbone.Model.gateWayUrl + '/interviewer';
            }
        },
        validation: {
            empid: [{
                required: true,
                msg: "Please specify employeeID."
            }, {
                pattern: /^\S\d+$(\.\d+)?/,
                msg: "Please specify valid employeeID."
            }],
            firstname: [{
                required: true,
                msg: "Please specify first name."
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: "Please specify valid first name."
            }],
            lastname: [{
                required: true,
                msg: "Please specify last name."
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: "Please specify valid last name."
            }]
        }
    });
});