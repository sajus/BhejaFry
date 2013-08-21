define(function (require) {

    var AlertModel = require('models/alerts');

    var _render = function(alert){
        console.log(alert.messages[0]);
        var message = [{message: alert.messages}];

        if(alert.messages[0].message) {
            message = alert.messages;
        }

        var alertModel = new AlertModel({
            type: alert.type,
            messages: message
        });
        return alertModel;
    };

    return {
        'render': _render
    };

});
