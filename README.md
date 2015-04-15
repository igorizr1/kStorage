# kStorage
angular kStorage is a wrapper for localStorage and sessionStorage

### install from bower
bower install angular-kstorage

```javascript

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

```