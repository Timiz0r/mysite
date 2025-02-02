// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkModifiedTime } from './remark.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://kyouha.today',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkModifiedTime],
	},
});
