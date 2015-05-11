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
### mapMode
Map which keys should go to localStorage and which should be maintained with sessionStorage


```javascript

    // set config to something like

    angular.module('kStorage.config', [])
    .constant("K_STORAGE_CONFIG", {
        prefix: "Myapp",
        mapMode: true,
        map: {
            kSession: ["user_name", "session_names"],
            kStorage: ["names", "storage_cities"]
        }
    });

    // then kStorage will dynamically use localStorage or sessionStorage...as before.

    // Take a not that this will work only with kStorage interface

    kStorage.set("whatever", "hello world");

```

