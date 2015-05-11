(function(){

    var kStorage = function(storage_sample, prefix, storageMap){
        /**
         * parse storageMap
         */

        var
        Storage = storage_sample,
        storage_name = (prefix + "_"),

        kStorageMap = (function(sMap){
            if(sMap){
                var finalMap = {}, all_storage_keys = [];
                if(sMap.kStorage && sMap.kStorage.length > 0){
                    sMap.kStorage.forEach(function(v){
                        if(all_storage_keys.indexOf(storage_name+v) >= 0)console.warn("kStorage: index "+v+" is already in use");
                        all_storage_keys.push(storage_name+v);
                        finalMap[storage_name+v] = "localStorage";
                    });
                }
                if(sMap.kSession && sMap.kSession.length > 0){
                    sMap.kSession.forEach(function(v){
                        if(all_storage_keys.indexOf(storage_name+v) >= 0)console.warn("kStorage: index "+v+" is already in use");
                        all_storage_keys.push(storage_name+v);
                        finalMap[storage_name+v] = "sessionStorage";
                    });
                }
                return finalMap;
            }else return false;
        }(storageMap)),

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
        },
        getStorage = function(k){
            if(kStorageMap){
                return ( (k in kStorageMap) ? window[kStorageMap[k]] : Storage );
            }else
                return Storage;
        };

        return {
            set: function(k, v) {
                k = (storage_name + k);
                if(arguments.length !== 2)
                    return false;
                if(v && typeof(v) !== "string")v = JSON.stringify(v);
                return getStorage(k).setItem(k, v);
            },
            get: function(k) {
                k = (storage_name + k);
                if (arguments.length !== 1)
                    return false;
                var result = getStorage(k).getItem(k);
                if(result === null)return false;
                return result.match(/\[.*\]|\{.*\}/)
                    ? JSON.parse(result)
                    : result;
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

                console.log("current_value");
                console.log(current_value);

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
                if(arguments.length === 1){
                    return getStorage(item).removeItem(storage_name + item);
                }else if(kStorageMap){
                    localStorage.clear();
                    sessionStorage.clear();
                }else{
                    Storage.clear();
                }
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
        var kStorageMap = ( (K_STORAGE_CONFIG.mapMode && K_STORAGE_CONFIG.map) ? K_STORAGE_CONFIG.map : false );
        return new kStorage(localStorage, K_STORAGE_CONFIG.prefix, kStorageMap);
    });

    angular.module('LocalStorageAdapter', ["general.config"])
    .factory('LocalStorageAdapter', function(GENERAL_CONFIG) {
        return new kStorage(localStorage, GENERAL_CONFIG.APP_NAME);
    });

}());

