# Complete authenticated and user management for any app

html.js auth is a an open souce self hosted alternative to Auth0, Clerk etc.

Deploy to Cloudflare Workers (using Cloudflare D1 SQLite as the database) under auth.yourdomain.com and you have a complete auth system for your app. It includes prebuilt pages for login, signup etc. and issues JWT tokens for users.

If you want to customize the UI, you can fork the repo and simply edit the .js files containing html with tailwindcss.

## Setup

Install wrangler:

```
npm install -g wrangler
```

Setup `wrangler.toml` file:

```
cp wrangler.toml.example wrangler.toml
```

Setup a Cloudflare D1 sqlite database:

```
wrangler d1 create htmljs-auth --experimental-backend
```

Copy the ouput starting `[[d1_databases]]` to the end of your `wrangler.toml` file.

Load db with schema an example data:

```
wrangler d1 execute htmljs-auth --local --file=./db/schema.sql
```

Install dependencies and run dev server:

```
pnpm install
pnpm run dev
# In sepate terminal run tailwindcss build watcher
pnpm run dev:css
```

```
pnpm run deploy
```