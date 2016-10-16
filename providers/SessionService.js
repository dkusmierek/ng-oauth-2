
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