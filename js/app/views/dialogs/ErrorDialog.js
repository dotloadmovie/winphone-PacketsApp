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

            fireDialog: function(message, title){
            
                var md = new Windows.UI.Popups.MessageDialog(title);
                var result, resultOptions = ['OK'];
                var cmd;
 
                for(var i = 0; i > resultOptions.length; i++) {
                    cmd = new Windows.UI.Popups.UICommand();
                    cmd.label = resultOptions[i];
                    cmd.invoked = function(c) {
                        result = c.label;
                    }
                    md.commands.append(cmd);
                }

                md.showAsync().then(function (c) {
                    console.log('answer: ' + result);
                });

            }

        });

        return ErrorDialog;
    });