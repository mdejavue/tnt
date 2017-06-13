sap.ui.define([
    "de/javue/tnt/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/tnt/model/WalletViewModelProvider",
    "de/javue/tnt/model/ConfigurationViewModelProvider"
], function (BaseController, MessageToast, WalletViewModelProvider, ConfigurationViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.Advertise", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
            this.setModel(ConfigurationViewModelProvider.getModel(), "configuration");
        },

        onSavePressed: function(oEvent) {
            var that = this,
                sFrom = this.getModel("wallet").getProperty("/MainAccount"),
                sJson = this.getView().byId("inpConfig").getValue();
            TntContract.setMyConfiguration(sJson, {
                from: sFrom,
                value: 1000000000000000000,
                gasPrice: 20000000000,
                gas: 4712388
            }).then(function (value) {
                console.log(value);
                MessageToast.show(that.getModel("i18n").getProperty("TOAST_SAVED"));
            });
        },

        onRefreshPressed: function(oEvent) {
            ConfigurationViewModelProvider.refresh();
        }
    });
});