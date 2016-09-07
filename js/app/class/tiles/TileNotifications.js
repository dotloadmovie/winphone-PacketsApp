define(['jquery', 'backbone', 'class/Class'],

    function ($, Backbone, AbstractClass) {

        var TileNotifications = AbstractClass.extend({

            initialize: function () {

                this.notifications = Windows.UI.Notifications;


            },

            sendNotification: function (num) {

                var _badgeType = this.notifications.BadgeTemplateType.badgeNumber;
                var _badgeXml = this.notifications.BadgeUpdateManager.getTemplateContent(_badgeType);

                var _badgeAttributes = _badgeXml.getElementsByTagName("badge");
                _badgeAttributes[0].setAttribute("value", num.toString());

                var _badgeNotification = new this.notifications.BadgeNotification(_badgeXml);
                this.notifications.BadgeUpdateManager.createBadgeUpdaterForApplication().update(_badgeNotification);



            },

            clearNotification: function () {

                this.notifications.BadgeUpdateManager.createBadgeUpdaterForApplication().clear();

            }

          

        });

        return TileNotifications;

    }
);