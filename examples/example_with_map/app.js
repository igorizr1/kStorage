angular.module('sampleApp', [
    "kStorage"
])
.controller('SampleController', function($scope, kStorage, kSession) {

    console.log(kStorage);
    var rand = function(){
        return Math.round(Math.random()*10);
    };

    var test_data = {
        id: 1,
        name: "John"
    };

    var test_array = [
        {
            hey:1
        }
    ];

    /**
     * kStorage
     */
    kStorage.set("user_name", test_data);
    kStorage.get("user_name");

    kStorage.set("session_names", test_data);
    kStorage.get("session_names");

    /**
     * kSession
     */

    kStorage.set("names", test_array);

    kStorage.set("ttt", test_array);
    kStorage.array_push("ttt", test_array);
    kStorage.array_splice("ttt", 1);
    kStorage.array_push("ttt", test_array);
    kStorage.array_splice("ttt", 1, 1);

    kStorage.set("storage_cities", test_data);

});