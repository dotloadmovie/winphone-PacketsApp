//Generic Panel

define([
    "jquery",
    "backbone",
    "views/dialogs/ErrorDialog",
    "class/utils/ErrorHandler",
    "../../../libs/jquery.pointerEvents",
    "../../../libs/plugins/backboneSuper"], function ($, Backbone, ErrorDialog, ErrorHandler) {

        var Panel = Backbone.View.extend({

            logger:null,

            initialize: function (options) {

                if (options.parentView) {

                    this.parentView = options.parentView;

                }

                this.$el.data('ref', this);
                this.errorDialog = new ErrorDialog();

                this.errorHandler = new ErrorHandler();

                this.logError = this.errorHandler.logError;

            },

            render: function () {



            },

            showProgress: function () {

                if (this.$el.find('progress').length < 1) {
                    this.$el.append('<progress></progress>');
                }

            },

            hideProgress: function () {

                this.$el.find('progress').remove();

            },

            logMessage: function (message) {

                this.parentView.logHandler.logMessage(message);

            },
            
            getAllLogs: function () {

                return this.parentView.logHandler.getAllLogs();

            },

            unlockPanel: function () {

                console.log('do display time rendering here');

            },

            lockPanel: function () {

                console.log('teardown of panel');

            }

        });

        return Panel;

 });