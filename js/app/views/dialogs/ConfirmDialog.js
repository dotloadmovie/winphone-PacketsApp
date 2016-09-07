define(
    ["jquery",
    "backbone",
    "views/dialogs/Dialog"], function ($, Backbone, Dialog) {

        var ErrorDialog = Dialog.extend({

            initialize: function () {

                this._super();

            },

            render: function () {

            },

            fireDialog: function (message, title, callBack) {

                var msg = new Windows.UI.Popups.MessageDialog(title, message);

                // Add commands and set their command handlers
                msg.commands.append(new Windows.UI.Popups.UICommand(
                    "OK",
                    function () {

                        callBack();

                    }));
                msg.commands.append(
                    new Windows.UI.Popups.UICommand("Cancel", function () { }));

                // Set the command that will be invoked by default
                msg.defaultCommandIndex = 0;

                // Set the command to be invoked when escape is pressed
                msg.cancelCommandIndex = 1;

                // Show the message dialog
                msg.showAsync();

            }

        });

        return ErrorDialog;
    });