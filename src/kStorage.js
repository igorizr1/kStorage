(function(){

    var kStorage = function(storage_sample, prefix){

        var Storage = storage_sample,
            storage_name = (prefix + "_"),
            empty = function(){
                try {
                    if(arguments.length === 0)return true;
                    for(var i = 0; i<arguments.length; ++i)
                        if(!arguments[i])
                            return true;
                        else
                        if((arguments[i] instanceof Array) && arguments[i].length === 0)
                            return true;
                        else if(typeof(arguments[i]) === "object" && Object.keys(arguments[i]).length === 0)
                            return true;
                        else if(typeof(arguments[i]) === "string" && arguments[i] === "")
                            return true;
                        else if(typeof(arguments[i]) === "number" && arguments[i] === "")
                            return true;
                    return false;
                } catch(e) {
                    return true;
                }
            };

        return {
            set: function(k, v) {
                k = (storage_name + k);
                if(arguments.length !== 2)
                    return false;
                if(v && typeof(v) !== "string")var v = JSON.stringify(v);
                return Storage.setItem(k, v);
            },
            get: function(k) {
                k = (storage_name + k);
                if (arguments.length !== 1)
                    return false;
                var result = Storage.getItem(k);
                if(result === null)return false;
                return result.match(/\[.*\]|\{.*\}/)
                    ? JSON.parse(result)
                    : result;
                return false;
            },
            array_push : function(k, v){
                var current_value = this.get(k);
                if(empty(current_value))
                    current_value = [];
                else if(!(current_value instanceof Array))
                    return false;
                current_value.push(v);
                return this.set(k, current_value);
            },
            array_splice : function(k, key, to){
                var current_value = this.get(k);
                if( !current_value instanceof Array) return false;
                var splised = current_value.splice(key, to ? to : 1);
                this.set(k,current_value);
                return splised;
            },
            object_push : function(k, v){
                var current_value = this.get(k);
                if(empty(current_value))
                    current_value = {};
                else if( (current_value instanceof Array) || (typeof(current_value) === "string") || (typeof(current_value) === "number") )
                    return false;
                if(Object.keys(v).length === 0)return false;
                for(var i in v)
                    current_value[i] = v[i];
                return this.set(k, current_value);
            },
            object_slice: function(k, key){
                var current_value = this.get(k);
                if( (current_value instanceof Array) || (typeof(current_value) === "string") || (typeof(current_value) === "number") )return false;
                delete current_value[key];
                return this.set(k, current_value);
            },
            in_object : function(k, key){
                var current_value = this.get(k);
                if( (current_value instanceof Array) || (typeof(current_value) === "string") || (typeof(current_value) === "number") )return false;
                return key in current_value;
            },
            in_array : function(k, key){
                var current_value = this.get(k);
                if(current_value instanceof Array)
                    return current_value.indexOf(key);
                return false;
            },
            in : function(k, key){
                var current_value = this.get(k);
                if( (typeof(current_value) === "string") || (typeof(current_value) === "number") )return false;
                return ( (current_value instanceof Array) ? this.in_array(k, key) : this.in_object(k, key) );
            },
            clear: function(item) {
                return (arguments.length === 1 ? Storage.removeItem(storage_name + item) : Storage.clear());
            }
        };
    };

    angular.module('kStorage', [
        'kStorage.config'
    ])
    .factory('kSession', function(K_STORAGE_CONFIG) {
        return new kStorage(sessionStorage, K_STORAGE_CONFIG.prefix);
    })
    .factory('kStorage', function(K_STORAGE_CONFIG) {
        return new kStorage(localStorage, K_STORAGE_CONFIG.prefix);
    });

    angular.module('LocalStorageAdapter', ["general.config"])
    .factory('LocalStorageAdapter', function(GENERAL_CONFIG) {
        return new kStorage(localStorage, GENERAL_CONFIG.APP_NAME);
    });

}());

