
define(["jquery", "backbone", "models/Model"],

    function ($, Backbone, Model) {

       
        var LocationModel = Model.extend({

            
            initialize: function (attributes, options) {

               

            },

            defaults: {
                title: '',
                lat: '',
                lng: ''
            },

            validate: function (attrs) {

            }

        });

        return LocationModel;

    }

);
