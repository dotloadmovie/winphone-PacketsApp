define(["jquery", "backbone", "models/Model"],

    function ($, Backbone, Model) {

        var WikiModel = Model.extend({

            urlBase: 'https://community-wikipedia.p.mashape.com/api.php',
            urlRoot: '',

            initialize: function (attributes, options) {

                $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

                    jqXHR.setRequestHeader('X-Mashape-Key', 'XXXX');

                });



            },

            setURLParams: function (params) {

                this.urlRoot = this.urlBase + '?' + $.param(params)+'&redirects';

            },

           
            defaults: {

            },


            validate: function (attrs) {

            }

        });


        return WikiModel;

    }

);
