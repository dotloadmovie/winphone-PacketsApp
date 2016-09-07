define(['jquery', 'backbone', 'class/Class'],

    function ($, Backbone, AbstractClass) {

        var ErrorHandler = AbstractClass.extend({

            initialize: function () {

               

            },

            logError: function (error) {

                $('body').trigger({
                    type: 'LOG_ERROR_EVENT',
                    message: error
                });

            }

        });

        return ErrorHandler;

    }
);