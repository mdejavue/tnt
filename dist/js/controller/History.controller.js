sap.ui.define([
    "de/javue/tnt/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/tnt/model/HistoryViewModelProvider"
], function (BaseController, MessageToast, HistoryViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.tnt.controller.History", {
        onInit: function () {
            this.setModel(HistoryViewModelProvider.getModel(), "history");
        },
        
        onGetInfoPressed : function(oEvent) {
            var that = this;
            var serno = this.getView().byId("input").getValue();
            TntContract.requestInfo(serno).then(function(e) {
                that.getView().byId("info").setValue(that.format(e));
            }).catch(function() {
                MessageToast.show("Not allowed to get Information.")
            });
        },

        format : function(e) {
            var status = web3.toDecimal(e[0]);
            var dispo = web3.toDecimal(e[1])

            return "Status: " + ["Inactive", "Active", "Deleted"][status] + "\n"
                    + "Disposition: " + ["Created", "Commissioned", "Shipping", "Received", "Destroyed"][dispo];
        }
    });
});