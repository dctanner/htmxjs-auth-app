export const authConfig = {
  secretKey: 'TODO_SET_FROM_ENV_VAR',
  issuer: 'urn:myorg:issuer',
  audience: 'urn:myorg:audience',
  expiry: '2h',
  cookieName: 'myorg-auth-token',
  redirectTo: '/dash',
};
