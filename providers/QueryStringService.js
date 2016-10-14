
ngOAuth2.service('QueryStringService', function () {
    this.encode = function (object) {
        if (object === undefined || object === {} || object === null) {
            return false;
        }

        var result = "";

        angular.forEach(object, function(value, key) {
            result += key + "=" + value + "&";
        });

        return result;
    };

    this.decode = function (string) {
        if (string == null || !string.length) {
            return false;
        }

        var arr = string.split('&'),
            result = {};

        angular.forEach(arr, function(value) {
            var keyValue = value.split('=');

            result[keyValue[0]] = keyValue[1];
        });

        return result;
    };
});