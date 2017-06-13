sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("de.javue.tnt.Component", {
        metadata : {
            manifest: "json"
        },

        init: function() {
            // wait for embark to register contract
            UIComponent.prototype.init.apply(this, arguments);
            var that = this;
            var checkReady = setInterval(function() {
                if (window.web3 && window.TntContract) {
                    clearInterval(checkReady);
                    that.getRouter().initialize();
                }
            },100);
        }
    });
});