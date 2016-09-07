﻿define(['jquery', 'backbone'], function ($, Backbone) {

    var Class = function () {
        this.initialize.apply(this, arguments);
    };

    //give Class events a default constructor
    _.extend(Class.prototype, Backbone.Events, { initialize: function () { } });

    //copy the extend feature from one of the backbone classes
    Class.extend = Backbone.Model.extend;

    return Class;
});
