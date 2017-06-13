sap.ui.define([
    "de/javue/tnt/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/tnt/model/WalletViewModelProvider",
    "de/javue/tnt/model/HistoryViewModelProvider"
], function (BaseController, MessageToast, WalletViewModelProvider, HistoryViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.History", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
            this.setModel(HistoryViewModelProvider.getModel(), "history");
        }
    });
});