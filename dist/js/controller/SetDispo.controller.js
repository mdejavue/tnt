sap.ui.define([
    "de/javue/tnt/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/tnt/model/WalletViewModelProvider"
], function (BaseController, MessageToast, WalletViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.SetDispo", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
        },

        onSetPressed: function(oEvent) {
            var that = this;
            var serno = this.getView().byId("input").getValue();
            TntContract.commission(serno).then(function(e) {
                that.getView().byId("log").setValue(serno + " commissioned.");
                MessageToast.show("Commissioned");
            });
        }
    });
});