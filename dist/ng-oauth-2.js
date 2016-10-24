
var ngOAuth2 = angular.module('ngOAuth2', []);

ngOAuth2.provider('OAuth2', function Oauth2Provider() {
    var config = {
        baseUrl: null,
        grantPath: null,
        refreshPath: null,
        revokePath: null,
        clientId: null,
        clientSecret: null,
        grantType: 'password'
    };

    this.setBaseUrl = function (baseUrl) {
        config.baseUrl = baseUrl;
    };

    this.setGrantPath = function (grantPath) {
        config.grantPath = grantPath;
    };

    this.setRefreshPath = function (refreshPath) {
        config.refreshPath = refreshPath;
    };

    this.setRevokePath = function (revokePath) {
        config.revokePath = revokePath;
    };

    this.setClientId = function (clientId) {
        config.clientId = clientId;
    };

    this.setClientId = function (clientId) {
        config.clientId = clientId;
    };

    this.setClientSecret = function (clientSecret) {
        config.clientSecret = clientSecret;
    };

    this.setGrantType = function (grantType) {
        config.grantType = grantType;
    };

    this.$get = ['$http', 'QueryStringService', 'OAuthSessionService',
        function ($http, QueryStringService, OAuthSessionService) {
            function authenticate(username, password) {
                return $http.post(config.baseUrl + config.grantPath, QueryStringService.encode({
                        client_id: config.clientId,
                        client_secret: config.clientSecret,
                        grant_type: config.grantType,
                        username: username,
                        password: password
                    }))
                    .success(function(response, status) {
                        if (status === 200) {
                            OAuthSessionService.create(response);
                        }
                    });
            }

            function revokeToken() {
                var session = OAuthSessionService.get();

                return $http.post(config.baseUrl + config.revokePath, QueryStringService.encode({
                        client_id: config.clientId,
                        client_secret: config.clientSecret,
                        token: session.access_token
                    }))
                    .success(function(response, status) {
                        if (status === 200) {
                            OAuthSessionService.clear();
                        }
                    });
            }

            function refreshToken() {
                var session = OAuthSessionService.get();

                return $http.post(config.baseUrl + config.grantPath, QueryStringService.encode({
                        client_id: config.clientId,
                        client_secret: config.clientSecret,
                        grant_type: 'refresh_token',
                        refresh_token: session.refresh_token
                    }))
                    .success(function(response, status) {
                        console.log(response);
                        if (status === 200) {
                            OAuthSessionService.create(response);
                        }
                    });
            }

            function getConfig() {
                return config;
            }

            return {
                authenticate: authenticate,
                refreshToken: refreshToken,
                revokeToken: revokeToken,
                getConfig: getConfig
            }
        }];
});


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

ngOAuth2.factory('OAuthSessionService', function() {
    function create(session) {
        if (session == null) {
            return false;
        }

        sessionStorage.setItem('oauth_session', JSON.stringify(session));
    }

    function get() {
        return JSON.parse(sessionStorage.getItem('oauth_session')) || undefined;
    }

    function clear() {
        sessionStorage.clear();
    }

    return {
        create: create,
        get: get,
        clear: clear
    }
});