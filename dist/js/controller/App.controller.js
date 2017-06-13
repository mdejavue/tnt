sap.ui.define([
    "de/javue/tnt/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.App", {
        onInit: function(oEvent) {
            this.byId("idApp").attachDetailNavigate(function(oEvent) {
                oEvent.getSource().hideMaster();
            });
        }
    });
});