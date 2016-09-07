//Home Panel

define([
    "jquery",
    "backbone",
    "views/subviews/Panel",
    "text!templates/subviews/settingspanel.html",
    ], function ($, Backbone, Panel, Template) {

        var SettingsPanel = Panel.extend({

            events: {

            },

            initialize: function (options) {

                this.el = options.el;

                this._super(options);
                this.render();

            },

            render: function () {

                this.template = _.template(Template, {});

                this.$el.html(this.template);

            }

        });

        return SettingsPanel;

    });