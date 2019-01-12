var OAUTH2_CLIENT_ID = '__YOUR_CLIENT_ID__';
var OAUTH2_SCOPES = [
    'https: //www.googleapis.com/auth/youtube'
];

googleApiClientReady = function() {
    gapi.auth.init(function() {
        window.setTimeout(checkAuth, 1);
    });
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {


        $('.pre-auth').hide();
        $('.post-auth').show();
        loadAPIClientInterfaces();
    } else {


        $('#login-link').click(function() {
            gapi.auth.authorize({
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: false
            }, handleAuthResult);
        });
    }
}


function loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', function() {
        handleAPILoaded();
    });
}