//Home Panel

define([
    "jquery",
    "backbone",
    "views/subviews/Panel",
    "text!templates/subviews/homepanel.html",
    "class/location/Geolocation",
    "collections/LocationCollection",
    "models/WikiModel",
    "class/voice/VoiceSynth",
    "class/tiles/TileNotifications"], function ($, Backbone, Panel, Template, Geolocation, LocationCollection, WikiModel, VoiceSynth, TileNotifications) {

        var HomePanel = Panel.extend({

            gl: null,
            isGettingData: false,
            panelActive: false,

            locationModel:null,

            events: {
                'click .load-next': 'handleNextButtonClick'
            },

            initialize: function (options) {

                this.el = options.el;

                $('body').on('GEOLOCATION_CHANGED', _.bind(this.handleLocationChanged, this));
                $('body').on('VOICE_SYNTH_COMPLETE', _.bind(this.handleVoiceComplete, this));

                this.tileNotifications = new TileNotifications();

                this._super(options);
                this.render();

            },

            render: function () {

                this.template = _.template(Template, {});

                this.$el.html(this.template);

                this.gl = new Geolocation({ $el: this.$el.find('#display-location') });

                this.switch = new WinJS.UI.ToggleSwitch(this.$el.find('#get-location')[0], {

                    labelOff: 'Location off',
                    labelOn: 'Location on',
                    onchange: _.bind(function (evt, val) {

                        this.switchHandler = evt.target.winControl;

                        if (evt.directEvent) {

                            this.switchHandler.checked = !this.switchHandler.checked;

                        }

                        if (this.switchHandler.checked) {
                            this.startGetLocation();
                            this.panelActive = true;
                            $('body').trigger('START_PULL_TO_REFRESH');
                        }
                        else {
                            this.stopGetLocation();
                            this.panelActive = false;
                            $('body').trigger('STOP_PULL_TO_REFRESH');
                        }

                    }, this)

                });

                this.$el.find('.load-next').on('click', _.bind(function () {

                    this.handleNextButtonClick();

                }, this)).css('display', 'none');

            },

            resetView: function () {

                var _promise = new WinJS.Promise(_.bind(function (complete, error) {

                    if (this.switchHandler && this.switchHandler.checked) {

                        this.switch.dispatchEvent('change', { directEvent: true });

                        setTimeout(_.bind(function () {

                            this.switch.dispatchEvent('change', { directEvent: true });

                        }, this), 300);

                    }
                    else {

                        this.switch.dispatchEvent('change', { directEvent: true });

                    }

                    complete();

                }, this));

                return _promise;

            },

            startGetLocation: function(e){
            
                this.locationCollection = new LocationCollection([], {});
                this.locationCollection.on('reset', this.handleLocationDataLoaded, this);

                this.wikiModel = new WikiModel();
                this.wikiModel.on('change', this.renderWikiData, this);
                
                this.synth = new VoiceSynth();

                this.showProgress();

                this.gl.startGetLocation();

            },

            handleLocationChanged: function (e) {

                if (this.isGettingData) {
                    this.logMessage('Attempting location change when location already active');
                    return;
                }

                this.isGettingData = true;
                this.logMessage('Location set successfully as ' + e.locData.lat + ' - ' + e.locData.lng);

                this.locationCollection.setURLParams({

                    "action": "query",
                    "list": "geosearch",
                    "gsradius": 10000,
                    "gscoord": e.locData.lat + '|' + e.locData.lng,
                    "format": "json",
                    "gslimit": 50

               });


               this.locationCollection.fetch({
                   reset: true,
                   cache: false,
                   error: _.bind(function (e) {

                       console.info('error from location fetch');
                       this.logError('Error occurred in location fetch');

                   }, this)

               });

            },

            stopGetLocation: function(){
        
                this.tileNotifications.clearNotification();

                try {
                    this.synth.stopVoice();
                    delete this.synth;
                } catch (e) {
                    delete this.synth;
                    console.error(e);
                }

                this.gl.stopGetLocation();
                this.hideProgress();

                this.wikiModel.off();
                this.locationCollection.off();

                delete this.wikiModel;
                delete this.locationCollection;

                //$('body').off('GEOLOCATION_CHANGED');
                this.isGettingData = false;

                this.$el.find('.load-next:first').css('display', 'none');

            },

            handleLocationDataLoaded: function () {

                this.num = 0;

                this.renderLocationData();

            },

            handleNextButtonClick: function (e) {

                this.num++;
                
                if (this.num > this.locationCollection.length - 1) {
                    this.num = 0;
                }

                this.renderLocationData();
            },

            renderLocationData: function () {

                this.hideProgress();
                this.$el.find('.load-next:first').css('display', 'none');

                this.tileNotifications.sendNotification(this.locationCollection.length);

                var _data = this.locationCollection.at(this.num);

                try {
                    this.synth.stopVoice();
                } catch (e) {
                  
                }


                if (_data === undefined || _data === '') {

                    this.switchHandler.dispatchEvent('change');

                    this.errorDialog.fireDialog('message body', 'Unable to get information about your current location. Try again later.');

                    this.$el.find('#get-location').trigger('click');

                    this.isGettingData = false;

                    this.$el.find('.load-next:first').css('display', 'block');

                    return;

                }

                this.wikiModel.setURLParams({
                    action: 'query',
                    format: 'json',
                    pageids:_data.get('pageid'),
                    prop: 'extracts'
                });

                this.showProgress();
               

                this.wikiModel.fetch({
                    cache: false, error: _.bind(function () {

                        console.info('error start on Wiki fetch');
                        this.logError('Error occurred in Wiki fetch');

                    }, this)
                });


            },

            renderWikiData: function () {

                var _pages = this.wikiModel.get('query').pages, _stripped = [], _toVoice = '';

                var _subs = _.values(_pages);

                this.hideProgress();

                this.$el.find('.load-next:first').css('display', 'block');

                this.$el.find('#display-location').html(_subs[0].extract);

                $('body').trigger({ type: "FIRE_AUDIO_EVENT", eventAlertType: 'general_alert' });

                this.$el.closest('.win-pivot-item-content').scrollTop(0);

                _stripped = this.$el.find('#display-location').text().split(/\r?\n/g);

                this.$el.find('#display-location').prepend('<h2>' + _subs[0].title + '</h2>');

                _toVoice = _.first(_stripped, 3).join(' ');

                this.synth.playVoice(_toVoice);

            },

            handleVoiceComplete: function (e) {

                this.isGettingData = false;

            },


            lockPanel: function () {

                this.undelegateEvents();

            }

        });

        return HomePanel;

    });