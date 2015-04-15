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

    kStorage.set("user_name", test_data);
    kStorage.get("user_name");

    kSession.set("user_name", test_data);
    kSession.get("user_name");

    kStorage.array_push("names", test_data);
    kSession.array_push("names", test_data);

    kStorage.array_splice("names", 1);
    kSession.array_splice("names", 1);

    kStorage.array_push("names", test_data);
    kSession.array_push("names", test_data);

    kStorage.array_splice("names", 1, 1);
    kSession.array_splice("names", 1, 1);


});