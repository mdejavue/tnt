sap.ui.define([
    "de/javue/tnt/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/tnt/model/WalletViewModelProvider"
], function (BaseController, MessageToast, WalletViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.Produce", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
        },

        onProducePressed: function (oEvent) {
            var that = this;    
            var serno = this.getView().byId("input").getValue();          
            TntContract.produce(serno).then(function (e) {
                that.getView().byId("log").setValue(serno + " produced.");
                MessageToast.show("1 Unit Produced");
            });
        }
    });
});