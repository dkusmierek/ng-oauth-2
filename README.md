# ng-oauth-2

Ng-oauth-2 is the module allows to authenticate users on the OAuth2 server in the application, which are wrote in AngularJS.

Module was created for private purposes due to all modules, which are currently available had many dependencies from
other libraries, which not always works correctly.

Finally I decided that I share a simple module on github.

## Configuration

Module configuration is very simple thanks to the possibilities offered by providers from AngularJS.

Information, which we will need to the correct configuration:
&nbsp;&nbsp;&nbsp;&nbsp;•	baseUrl
&nbsp;&nbsp;&nbsp;&nbsp;•	grantPath
&nbsp;&nbsp;&nbsp;&nbsp;•	refreshPath
&nbsp;&nbsp;&nbsp;&nbsp;•	revokePath
&nbsp;&nbsp;&nbsp;&nbsp;•	clientId
&nbsp;&nbsp;&nbsp;&nbsp;•	clientSecret
&nbsp;&nbsp;&nbsp;&nbsp;•	grantType (default: ‘password’)

If we have every needed information we may start create configuration

```javascript
app.config(['$httpProvider', 'OAuth2Provider', function($httpProvider, OAuth2Provider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    OAuth2Provider.setBaseUrl('https://example.com/');
    OAuth2Provider.setGrantPath('auth/token');
    OAuth2Provider.setRefreshPath('auth/token');
    OAuth2Provider.setRevokePath('auth/revoke-token');
    OAuth2Provider.setClientId('MKiaGCJXOtBeNsNK49Cbz3ShjirFWkpNJBDi1phk');
    OAuth2Provider.setClientSecret('67x1l2IzbPBbIH2SspGBPyoymU2Tv4ibINvYdUjAHhv3rcB0QY4LB6l6T8dayVYhIzjktKuBdJTy2kW3mVFmxReA9vZfBjICQe8s488ob69lHnIQ22UlVq4CL8Ab2WgA');
}]);
```

As you can se above, we should also set header **_'Content-Type'_** for HTTP to _**"application/x-www-form-urlencoded"**_

## How to use

**Authentication**

```javascript
OAuth2.authenticate(username, password).then(function() {
    console.log('Logged');
}, function() {
    console.error('Error');
});
```

**Revoke current session**
```javascript
OAuth2.revokeToken().then(function() {
    console.log('Revoked');
}, function() {
    console.error('Error');
});
```

**Refresh token**
```javascript
OAuth2.refreshToken().then(function() {
    console.log('Refreshed');
}, function() {
    console.error('Error');
});
```

**Get current configuration**
```javascript
OAuth2.getConfig();
```

## Session

Session, which is created during the authentication is stored in session storage in browser.

## License

MIT License

Copyright &copy; 2016 dkusmierek