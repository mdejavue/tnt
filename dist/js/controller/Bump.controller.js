sap.ui.define([
    "de/javue/tnt/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/tnt/model/WalletViewModelProvider",
    "de/javue/tnt/model/ContractViewModelProvider"
], function (BaseController, MessageToast, WalletViewModelProvider, ContractViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.Bump", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
            this.setModel(ContractViewModelProvider.getModel(), "contract");
        },

        onBumpPressed: function (oEvent) {
            var that = this,
                sFrom = this.getModel("wallet").getProperty("/MainAccount"),
                sBumpAddress = this.getView().byId("inpAddress").getValue(),
                iAmount = this.getView().byId("inpAmount").getValue();
            TntContract.bump(sBumpAddress, {
                from: sFrom,
                value: iAmount,
                gasPrice: 20000000000,
                gas: 4712388
            }).then(function (value) {
                console.log(value);
                MessageToast.show(that.getModel("i18n").getProperty("TOAST_BUMPED"));
            });
        }
    });
});