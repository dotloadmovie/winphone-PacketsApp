define(['jquery', 'backbone', 'class/Class'],

    function ($, Backbone, AbstractClass) {

        var Geolocation = AbstractClass.extend({

            location: null,
            iterations: 0,
            proxypositionhandler:null,

            initialize: function (options) {

                this.$el = options.$el;

            },

            startGetLocation: function (e) {

                var _scope = this;

                if (this.location === null) {
                    this.location = new Windows.Devices.Geolocation.Geolocator();
                    this.location.reportInterval = 30000;
                }

                this.proxypositionhandler = _.bind(this.positionChangedHandler, this);
             
                this.location.addEventListener('positionchanged', this.proxypositionhandler);

            },

            positionChangedHandler: function(evt){

                this.getLocationHandler(evt.position);

            },


            stopGetLocation: function () {

                this.$el.html('');

                this.location.removeEventListener('positionchanged', this.proxypositionhandler);

                this.location = null;
                delete this.location;
                this.location = null;

                this.iterations = 0;

                $('body').trigger({
                    type: 'GEOLOCATION_REPORT_OFF'
                });
                
            },

            getLocationHandler: function (pos) {

                var _output = '';

                console.log('get location handler');
                console.info(pos);

                $('body').trigger({
                    type: 'GEOLOCATION_CHANGED',
                    locData: {
                        lat: parseFloat(pos.coordinate.point.position.latitude.toFixed(10)),
                        lng: parseFloat(pos.coordinate.point.position.longitude.toFixed(10))
                    }
                });

            },

            locationErrorHandler: function (e) {

                var _output = '';

                _output += e.message;

                _output += this.getStatusString(location.locationStatus);

                this.$el.html(_output);

            },

            getStatusString: function(locStatus) {

                switch (locStatus) {
                    case Windows.Devices.Geolocation.PositionStatus.ready:
                        // Location data is available
                        return "Location is available.";        
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.initializing:
                        // This status indicates that a GPS is still acquiring a fix
                        return "A GPS device is still initializing."; 
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.noData:
                        // No location data is currently available 
                        return "Data from location services is currently unavailable.";       
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.disabled:
                        // The app doesn't have permission to access location,
                        // either because location has been turned off.
                        return "Your location is currently turned off. " +
                            "Change your settings through the Settings charm " +
                            " to turn it back on.";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                        // This status indicates that the app has not yet requested
                        // location data by calling GetGeolocationAsync() or 
                        // registering an event handler for the positionChanged event. 
                        return "Location status is not initialized because " +
                            "the app has not requested location data.";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.notAvailable:
                        // Location is not available on this version of Windows
                        return "You do not have the required location services " +
                            "present on your system.";
                        break;
                    default:
                        return 'Default location returned';
                        break;
                }
            },

        });

        return Geolocation;

});