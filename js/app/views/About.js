// About.js
// -------
define(["jquery", "backbone", "views/View", "models/Model", "text!templates/about.html", "../../libs/jquery.pointerEvents"],

    function ($, Backbone, View, Model, template) {

        var AboutView = View.extend({

            initialize: function (options) {

                this.message = options.message;

                this._super();

                this.render();

            },

            events: {
                'pointerdown h1': 'handlePointerDown'
            },

            render: function () {

                this.template = _.template(template, {message: this.message});

                this.$el.html(this.template);

                var _element = $('#container')[0];


                // Maintains chainability
                return this;

            },

            handlePointerDown: function () {

                this.$el.html('<h1>Updating after event</h1>');

            }



        });

        return AboutView;

    }

);