
define(["jquery", "backbone", "models/Model"],

    function ($, Backbone, Model) {

        var MapModel = Model.extend({

            urlBase: 'https://orfeomorello-static-map.p.mashape.com/mashape/staticimagemap',
            urlRoot: '',

            // Model Constructor
            initialize: function (attributes, options) {

                $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

                    jqXHR.setRequestHeader('X-Mashape-Key', 'XXX');

                });



            },

            setURLParams: function (params) {

                var _param = '', _path = '';

                    _path += '/lat/'+params.lat;
                    _path += '/lng/'+params.lng;
                    _path += '/provider/Bing';

                    _param += '?width=340';
                    _param += '&height=340';
                    _param += '&maptype=roadmap';
                    _param += '&key=' + params.key;
            

                    this.urlRoot = this.urlBase +_path + _param;

                    console.log(this.urlRoot);

            },

            defaults: {

            },

            validate: function (attrs) {

            }

        });

        return MapModel;

    }

);
