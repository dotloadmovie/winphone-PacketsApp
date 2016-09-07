// Home.js
// -------
define(["jquery",
        "backbone",
        "views/View",
        "views/subviews/HomePanel",
        "views/subviews/SettingsPanel",
        "views/subviews/DebugPanel",
        "views/subviews/AboutPanel",
        "collections/PointCollection",
        "text!templates/home.html",
        "class/utils/LogHandler",
        "../../libs/jquery.pointerEvents"
        ],

    function ($, Backbone, View, HomePanel, SettingsPanel, DebugPanel, AboutPanel, ItemCollection, template, LogHandler) {

        var HomeView = View.extend({

            initialize: function () {

                this.logHandler = new LogHandler();

                this._super();

                WinJS.UI.enableAnimations();

                this.logHandler.model.on('LOG_MODEL_READY', this.render, this);
                this.logHandler.loadLogs();


            },

            events: {

            },

            render: function () {
              
                //NOTE: you can use either WinJS declarative-style data binding, or the regular Backbone way. Or mix and match.
                //The example below adds some data to the template at rendertime using underscore templating
                //and then postfills with data in the WinJS manner.

                this.template = _.template(template, { model: {title:'HELLO WORLD'}});

                this.$el.html(this.template);

                this.homePanel = new HomePanel({ el: '#home-panel', parentView: this });
                this.settingsPanel = new SettingsPanel({ el: '#settings-panel', parentView: this });
                this.aboutPanel = new AboutPanel({ el: '#about-panel', parentView: this });
                this.debugPanel = new DebugPanel({ el: '#debug-panel', parentView: this });

                WinJS.UI.processAll();

                this.pivotControl = mainPivotControl;

                this.pivotControl.addEventListener('selectionchanged', this.handleSelectionChanged);

                $('body').on('FIRE_AUDIO_EVENT', _.bind(this.handleAudioEvent, this));

                this.pullLoader = $('#container')[0];

                this.pullLoader.addEventListener('refresh', _.bind(function (e) {

                    e.detail.setPromise(this.homePanel.resetView());

                }, this));

                $('body').on('START_PULL_TO_REFRESH', _.bind(function () {

                    $(this.pullLoader).find('.touch-outer').attr('data-pulldisabled', false)

                }, this));

                $('body').on('STOP_PULL_TO_REFRESH', _.bind(function () {

                    $(this.pullLoader).find('.touch-outer').attr('data-pulldisabled', true)

                }, this));

                $('body').trigger('STOP_PULL_TO_REFRESH');


                this.logHandler.logMessage('Application successfully started');

               // this.setupAppBar();

                return this;

            },


            setupAppBar: function () {

                this.appbarpin = new WinJS.UI.AppBarCommand(this.$el.find('#app-bar-pin')[0], {

                    icon: 'pin'

                });


                this.appbar = new WinJS.UI.AppBar(this.$el.find('#app-bar')[0], {

                    section: 'global',
                    commands: [this.appbarpin]

                });


            },

            handleAudioEvent: function (evt) {

                var _sound = evt.eventAlertType + '.mp3';

                var _play = new this.buzzer.sound('/audio/alerts/' + _sound, {
                    preload: true,
                    autoplay: true,
                    loop: false
                });

                _play.play();


            },

            //panel loaded in? Unlock/lock panel 
            //(unload data, switch off any bound, unneeded event listeners etc)
            handleSelectionChanged: function (e) {

                this.currentPanel = e.detail.item;

                if ($(this.currentPanel.element).find('.panel-container:first').data('ref') !== undefined) {

                    $(this.currentPanel.element).find('.panel-container:first').data('ref').lockPanel();

                }

                if (e.detail.item !== undefined && $(e.detail.item.element).find('.panel-container:first').data('ref') !== undefined) {

                    $(e.detail.item.element).find('.panel-container:first').data('ref').unlockPanel();

                }

            },

            handlePointerDown: function () {

                this.$el.html('<h1>Updating after event</h1>');

            }



        });

        return HomeView;

    }

);