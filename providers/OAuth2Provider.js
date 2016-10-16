
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
                // To do
            }

            return {
                authenticate: authenticate,
                refreshToken: refreshToken,
                revokeToken: revokeToken
            }
        }];
});
