angular.module('kStorage.config', [])
    .constant("K_STORAGE_CONFIG", {
        prefix: "example_with_map",
        mapMode: true,
        map: {
            kSession: ["user_name", "session_names"],
            kStorage: ["names", "storage_cities", "ttt"]
        }
    });