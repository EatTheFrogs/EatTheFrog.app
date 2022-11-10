const oktaAuthConfig = {
    issuer: 'https://dev-78808265.okta.com/oauth2/default',
    clientId: '0oa1m2ugipZPaGc6X5d7',
    redirectUri: window.location.origin + '/login/callback',
    postLogoutRedirectUri: window.location.origin + '/login',
    pkce: true
};
  
const oktaSignInConfig = {
    issuer: 'https://dev-78808265.okta.com/oauth2/default',
    baseUrl: 'https://dev-78808265.okta.com',
    clientId: '0oa1m2ugipZPaGc6X5d7',
    redirectUri: window.location.origin + '/login/callback',
    postLogoutRedirectUri: window.location.origin + '/login',
    authParams: {
      pkce: true
    },
    features: {
      registration: true
    },
    scopes: ['openid', 'email', 'offline_access'],
    tokenManager: {
      autoRenew: true,
    }
};
  
export { oktaAuthConfig, oktaSignInConfig };

export const POST_LOGOUT_REDIRECT_URI = window.location.origin + '/login';