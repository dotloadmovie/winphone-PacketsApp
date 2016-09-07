// View.js
// -------
define(["jquery",
    "backbone",
    "models/Model",
    "text!templates/home.html",
    "../../libs/jquery.pointerEvents",
    "../../libs/plugins/backboneSuper",
    "../../libs/buzz.min"],

    function($, Backbone, Model, template, Pointer, Super, buzz){

        var View = Backbone.View.extend({

            el: "#container",

            initialize: function(){

                this.buzzer = buzz;

                this.$el.data('ref', this);

            },

            events: {
               
            },

        });

        // Returns the View class
        return View;

    }

);