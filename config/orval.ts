import { defineConfig } from 'orval';

export default defineConfig({
  spreeStorefront: {
    output: {
      mode: 'tags-split',
      target: '../api/spree-platform.ts',
      schemas: '../api/schema',
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
