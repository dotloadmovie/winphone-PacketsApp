define(["jquery","backbone","collections/Collection","models/ItemModel"],

  function($, Backbone, Collection, ItemModel) {

    var PointCollection = Collection.extend({

        model: ItemModel,

        getBinding: function () {

            return new WinJS.Binding.List(this.toJSON(), { binding: false, proxy: false });

        }

    });

    return PointCollection;

  }

);
