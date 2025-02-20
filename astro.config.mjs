// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkModifiedTime } from './remark.mjs';
import rehypeExternalLinks from 'rehype-external-links'

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://kyouha.today',
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  vite: {
    resolve: {
      alias: {
        "@": new URL('./src/', import.meta.url).pathname,
      },
    }
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' },
          rel: ['nofollow']
        }
      ]
    ],
  },
});