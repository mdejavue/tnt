sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    var _oModel = null;
    var _initWalletModel = function(){
        _oModel = new JSONModel({
            "MainAccount" : "",
        }).setDefaultBindingMode("OneWay");
        var accountInterval = setInterval(function() {
            if (web3.eth.accounts[0] !== _oModel.getProperty("/MainAccount")) {
                _oModel.setProperty("/MainAccount", web3.eth.accounts[0]);
            }
        }, 300);
    };

    return {
        getModel: function() {
            if (!_oModel) {
                _initWalletModel();
            }
            return _oModel;
        }
    };
},true);