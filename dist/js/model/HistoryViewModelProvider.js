sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    var _oModel = null;

    var getTransactionsByAccount = function (myaccount) {
        return new Promise(function (mainresolve, mainreject) {
            var startBlockNumber;
            var endBlockNumber;
            Promise.resolve().then(function () {
                return new Promise(function(resolve, reject) {
                    web3.eth.getBlockNumber(function (endBlockNo) {
                        resolve(endBlockNo);
                    });
                });
            }).then(function (endBlockNo) {
                endBlockNumber = 20;
                startBlockNumber = endBlockNumber - 20;
                var aPromises = [];
                for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                    aPromises.push(new Promise(function (resolve, reject) {
                        web3.eth.getBlock(i, true, function (e, block) {
                            resolve(block);
                        });
                    }));
                }
                return Promise.all(aPromises);
            }).then(function (aBlocks) {
                var aPromises2 = [];
                aBlocks.forEach(function(block) {
                    if (block != null && block.transactions != null) { 
                        block.transactions.forEach(function (tx) {
                            aPromises2.push(new Promise(function(resolve,reject) {
                                var txHash = tx.hash || tx;
                                web3.eth.getTransaction(txHash, function(e, txObject) {
                                    resolve(txObject);
                                });
                            }));
                        });
                    }
                });
                return Promise.all(aPromises2);
            }).then(function (aTransactions) {
                var aRelevant = aTransactions.filter(function(e) {
                    return myaccount == "*" || myaccount == e.from || myaccount == e.to;
                });
                mainresolve(aRelevant);
            });
        });
    }

    var _initHistoryModel = function () {
        abiDecoder.addABI(TntContract.abi);
        _oModel = new JSONModel({
            "TntContract": {
                "Transactions": []
            },
        }).setDefaultBindingMode("OneWay");
        var accountInterval = setInterval(function () {
            getTransactionsByAccount("0x86e386ca0c1bdd27e62f75081a1b85fee11f2ba8").then(function(aEntries) {
                aEntries.forEach(function(e) {
                    var decoded = abiDecoder.decodeMethod(e.input);
                    e.decoded = decoded;
                });
                _oModel.setProperty("/TntContract/Transactions", aEntries);
            });
        }, 5000);
    };

    return {
        getModel: function () {
            if (!_oModel) {
                _initHistoryModel();
            }
            return _oModel;
        }
    };
}, true);
