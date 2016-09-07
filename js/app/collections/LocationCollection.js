define(["jquery", "backbone", "collections/Collection", "models/LocationModel"],

  function ($, Backbone, Collection, LocationModel) {

      var LocationCollection = Collection.extend({

          urlBase: 'https://en.wikipedia.org/w/api.php',
          url: '',

          setURLParams: function (params) {

              this.url = this.urlBase + '?' + $.param(params);

          },

          getBinding: function () {

              return new WinJS.Binding.List(this.toJSON(), {binding: false, proxy: false });

          },

          parse: function (data) {

              return data.query.geosearch;

          }

        

      });

      return LocationCollection;

  }

);
