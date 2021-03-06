
require.config({

  baseUrl: "/js",

  paths: {

      // Core Libraries
      // --------------
      "jquery": "libs/jquery",

      "jqueryui": "libs/jqueryui",

      "underscore": "libs/lodash",

      "backbone": "libs/backbone",

      // Plugins
      // -------
      "backbone.validateAll": "libs/plugins/Backbone.validateAll",

      "bootstrap": "libs/plugins/bootstrap",

      "text": "libs/plugins/text",

      "touchControls": "libs/touchControls",

      // Application Folders
      // -------------------
      "collections": "app/collections",

      "class": "app/class",

      "models": "app/models",

      "routers": "app/routers",

      "templates": "app/templates",

      "views": "app/views"

  },

  shim: {

      "jqueryui": ["jquery"],

      "backbone.validateAll": ["backbone"]

  }

});

require(["jquery", "backbone", "app/routers/Router", "jqueryui", "backbone.validateAll", "touchControls"],

  function ($, Backbone, Router) {

      new Router();

  }

);

