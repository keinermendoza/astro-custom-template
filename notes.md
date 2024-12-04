## create db in cloudflare and locally
```bash
npx wrangler@latest d1 create astro-cloud-test
```

## exceutes sql from file locally

```bash
npx wrangler d1 execute astro-cloud-test --local --file=./db/schema.sql
npx wrangler d1 execute astro-cloud-test --local --file=./db/seed_users.sql
npx wrangler d1 execute astro-cloud-test --local --file=./db/seed_blog_posts.sql
```

## exceutes sql from command line locally

```bash
npx wrangler d1 execute astro-cloud-test --local --command="SELECT * FROM users"
```

## cloudflare D1 query sintaxys

https://developers.cloudflare.com/d1/build-with-d1/d1-client-api/

## resolving compatibility problems between cloudflare runtime and nodejs 

https://github.com/withastro/astro/issues/11005
https://docs.astro.build/en/guides/integrations-guide/cloudflare/#nodejs-compatibility