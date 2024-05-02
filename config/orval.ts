import { defineConfig } from 'orval';

export default defineConfig({
  spreeOauth: {
    output: {
      mode: 'tags-split',
      target: '../lib/api/spree-oauth.ts',
      schemas: '../lib/api/schema',
      client: 'react-query',
      override: {
        query: {
          useSuspenseQuery: true,
          version: 5
        },
        mutator: {
          path: './custom-instance.ts',
          name: 'customInstance'
        }
      }
    },
    input: {
      target: 'http://localhost:3000/api-docs/spree/oauth.yaml'
    },
    hooks: {
      afterAllFilesWrite: 'pnpm prettier'
    }
  },
  spreeStorefront: {
    output: {
      mode: 'tags-split',
      target: '../lib/api/spree-platform.ts',
      schemas: '../lib/api/schema',
      client: 'react-query',
      override: {
        query: {
          useSuspenseQuery: true,
          version: 5
        },
        mutator: {
          path: './custom-instance.ts',
          name: 'customInstance'
        }
      }
    },
    input: {
      target: 'http://localhost:3000/api-docs/spree/storefront.yaml'
    },
    hooks: {
      afterAllFilesWrite: 'pnpm prettier'
    }
  }
});
