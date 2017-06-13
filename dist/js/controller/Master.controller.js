sap.ui.define([
    "de/javue/tnt/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.Master", {
        menuNavTo: function(oEvent) {
            var sNavTarget = oEvent.getSource().data("navTarget");
            this.getRouter().navTo(sNavTarget);
        }
    });
});