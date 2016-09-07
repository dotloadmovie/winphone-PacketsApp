define(['jquery', 'backbone', 'class/Class','models/LogModel'],
   
    function ($, Backbone, AbstractClass, Model) {

        var LogHandler = AbstractClass.extend({

            initialize: function () {

                this.model = new Model({}, {});
                
            },

            loadLogs: function () {

                this.model.getLogs();

            },

            getAllLogs: function () {

                return this.model.get('logmessages');

            },

            clearLogs: function () {

                this.model.set('logmessages', '', { silent: true });
                this.model.setLogs();

            },

            logMessage: function (message) {

                var annotatedMessage = new Date().toISOString() + '||' + message + '\n\n';

                var currentMessages = this.model.get('logmessages');

                var updatedMessages = '';

                if (currentMessages === undefined) {
                    this.model.set('logmessages', annotatedMessage, { silent: true });
                }
                else {
                    this.model.set('logmessages', this.model.get('logmessages') + annotatedMessage, { silent: true });
                }

                this.model.setLogs();

                $('body').trigger({
                    type: 'LOG_MESSAGE_EVENT',
                    message: annotatedMessage
                });

            }

        });

        return LogHandler;

    }
);