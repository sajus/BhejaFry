define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({
        initialize: function() {

        },
        setModalEl: function(modalEl){
            this.modalEl = modalEl;
        },
        getModalEl: function(){
            return this.modalEl;
        }
    });

});
