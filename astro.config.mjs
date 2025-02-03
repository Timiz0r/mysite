// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkModifiedTime } from './remark.mjs';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://kyouha.today',
  integrations: [mdx(), sitemap(), react()],

  markdown: {
      remarkPlugins: [remarkModifiedTime],
  },
});