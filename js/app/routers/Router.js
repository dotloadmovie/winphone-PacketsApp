// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "views/Home", "views/About", "collections/Collection"],

    function($, Backbone, HomeView, AboutView, Collection) {

        var Router = Backbone.Router.extend({

            initialize: function() {

                $.ajaxSetup({cache: false});

                $(document).on('click', 'a:not([data-external])', _.bind(function (e) {

                    // this.navigate($(e.currentTarget).attr('href'), t);
                    //this.navHandler($(e.currentTarget).attr('href'));

                    e.preventDefault();
                    console.log($(e.currentTarget).attr('href'));
                    this.navigate($(e.currentTarget).attr('href'), true);
                    return false;

                }, this));

                

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

                

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "about/:message": "about"

            },

            navHandler: function (url, params) {

                var _params = null;

                if (params) {
                    _params = params;
                }

                this[url](params);

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                this.currentView = new HomeView();

            },

            about: function(message){
            
                console.log('aoubt!');
                this.currentView = new AboutView({message:message});

            },

            tearDown: function () {

            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);