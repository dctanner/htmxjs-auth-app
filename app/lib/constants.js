// TODO move all to env vars or single json env
export const authConfig = {
  secretKey: 'TODO_SET_FROM_ENV_VAR',
  domain: 'example.com', // Site domain without subdomain // TODO set from env var
  redirectTo: 'https://example.com', // Your site's logged in homepage or dashboard // TODO set from env var
  cookieName: 'myapp-auth-token',
  issuer: 'urn:myorg:issuer',
  audience: 'urn:myorg:audience',
  expiry: '24h',
};

export const emailConfig = {
  from: 'sender@example.com',
  name: 'Example App',
}
