
define(["jquery", "backbone", "models/Model"],

    function ($, Backbone, Model) {

        
        var LogModel = Model.extend({

          
            initialize: function (attributes, options) {

               this.localRef = WinJS.Application.local;


            },

            defaults: {

            },

            
            validate: function (attrs) {

            },

            getLogs: function () {

                this.localRef.readText('persist_log', 'Empty Log').done(_.bind(function (fileResponse) {

                    this.set('logmessages', fileResponse);
                    console.log(this);
                    this.trigger('LOG_MODEL_READY');

                }, this));

            },


            setLogs: function () {

                 this.localRef.writeText('persist_log', this.get('logmessages'));

            },

            clearLogs: function () {



            }

        });

       
        return LogModel;

    }

);
