sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    var _oModel = null;
    var _refreshConfiguration = function() {
        if (_oModel) {
            TntContract.getMyConfiguration().then(function(sJson) {
                _oModel.setProperty("/Json", sJson);
            });
        }
    }
    var _initConfigurationModel = function(){
        _oModel = new JSONModel({
            "Json" : "",
        }).setDefaultBindingMode("OneWay");
        _refreshConfiguration();
    };

    return {
        getModel: function() {
            if (!_oModel) {
                _initConfigurationModel();
            }
            return _oModel;
        },
        
        refresh: function() {
            _refreshConfiguration();
        }
    };
},true);