//Home Panel

define([
    "jquery",
    "backbone",
    "views/subviews/Panel",
    "text!templates/subviews/debugpanel.html",
    "models/MapModel",
    "views/dialogs/ConfirmDialog"

], function ($, Backbone, Panel, Template, MapModel, ConfirmDialog) {

    var DebugPanel = Panel.extend({

        mapskey: 'Amynwf0x7Dn_ec6NSdo5zeq_OGWvp2bMFuXx2P0jMawpzJZMGelpAJMR7_DVvh2H',

        isGettingData: false,

        events: {
            'click #clear-log': 'handleClearLogClick',
            'click #copy-log': 'handleCopyLogClick'
        },

        initialize: function (options) {

            this.el = options.el;

            this._super(options);
            this.render();

            $('body').on('GEOLOCATION_CHANGED', _.bind(this.handleLocationChanged, this));
            $('body').on('GEOLOCATION_REPORT_OFF', _.bind(this.handleResetMap, this));

            $('body').on('LOG_MESSAGE_EVENT', _.bind(this.handleLogFired, this));

        },

        render: function () {

            this.template = _.template(Template, {logs:this.getAllLogs()});

            this.$el.html(this.template);

        },

        handleLogFired: function (e) {

            this.$el.find('#display-log').append(e.message);

        },

        handleLocationChanged: function (e) {

            if (this.isGettingData) {
                return;
            }

            this.showProgress();

            this.isGettingData = true;

            var _mapContainer = this.$el.find('#display-map');

            _mapContainer.html('');

            _mapContainer.append('<p>Latitude = ' + e.locData.lat + '</p><p>Longitude = ' + e.locData.lng + '</p>');

            _mapContainer.append('<div id="map-div"></div>');

            this.currLoc = e.locData;

            this.mapModel = new MapModel({}, {});
            this.mapModel.on('change', this.makeMap, this);

            this.mapModel.setURLParams({ lat: e.locData.lat, lng: e.locData.lng, key: this.mapskey })

            this.mapModel.fetch({ error: function (e) { console.info('error occurred!'); console.log(e)}});

        },

        handleResetMap: function () {

            this.isGettingData = false;
            this.$el.find('#display-map').html('<p>Application inactive. No debug map data available.</p>');

        },

        makeMap: function () {

            this.hideProgress();

            this.$el.find('#map-div').html(this.mapModel.get('html'));

            this.isGettingData = false;

        },

        handleCopyLogClick: function () {

            this.$el.find('#display-log').select();

        },

        handleClearLogClick: function () {

            this.confirmDialog = new ConfirmDialog();
            this.confirmDialog.fireDialog('This will delete all logs', 'Are you sure?', _.bind(this.clearLogs, this));

        },

        clearLogs: function () {

            this.parentView.logHandler.clearLogs();
            this.$el.find('#display-log').html('');

        }

    });

    return DebugPanel;

});