import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/*
	Previously tried to expose dayjs via z.string().transform() and z.instanceof().
	Even though the Astro docs show transform working just fine, no such luck, and an error occurs.
	Error also occurs with instanceof.

	As such, we'll pass around Dates and convert to dayjs where necessary.
*/

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		cover: image(), // alt text is effectively the description field
	}),
});

export const collections = { blog };
