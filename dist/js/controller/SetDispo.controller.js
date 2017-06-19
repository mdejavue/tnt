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
            var dispo = this.getView().byId("select").getSelectedKey();
            var serno = this.getView().byId("input").getValue();
            var shipto = this.getView().byId("shipto").getValue();
            var log = that.getView().byId("log");

            switch (dispo) {
                    case "commission":
                        TntContract.commission(serno).then(function(e) {
                            log.setValue(serno + " commissioned.");                            
                        }).catch(that.fnError);
                        break;
                    case "ship":
                        TntContract.ship(serno, shipto).then(function(e) {
                            log.setValue(serno + " shipped to " + shipto + ".");                            
                        }).catch(that.fnError);
                        break;
                    case "received":
                        TntContract.receive(serno).then(function(e) {
                            log.setValue(serno + " received.");                            
                        }).catch(that.fnError);
                        break;
                    case "destroy":
                        TntContract.destroy(serno).then(function(e) {
                            log.setValue(serno + " destroyed.");                            
                        }).catch(that.fnError);
                        break;
                }

        },

        fnError : function(oError) {
            MessageToast.show("Disposition not possible.");
        }
    });
});