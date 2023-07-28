export const authConfig = {
  secretKey: 'TODO_SET_FROM_ENV_VAR',
  issuer: 'urn:myorg:issuer',
  audience: 'urn:myorg:audience',
  expiry: '24h',
  cookieName: 'myapp-auth-token',
  redirectTo: '/',
};

export const emailConfig = {
  from: 'sender@example.com',
  name: 'Example App',
