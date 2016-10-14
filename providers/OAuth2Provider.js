
ngOAuth2.provider('OAuth2', function Oauth2Provider() {
    var config = {
        baseUrl: null,
        grantPath: null,
        refreshPath: null,
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
                $http.post(config.baseUrl + config.grantPath, QueryStringService.encode({
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

            function refreshToken() {
                // To do
            }

            return {
                authenticate: authenticate,
                refreshToken: refreshToken
            }
        }];
});
