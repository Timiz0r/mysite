import path from "node:path";
import { slug as githubSlug } from 'github-slugger'
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/*
	Previously tried to expose dayjs via z.string().transform() and z.instanceof().
	Even though the Astro docs show transform working just fine, no such luck, and an error occurs.
	Error also occurs with instanceof.

	As such, we'll pass around Dates and convert to dayjs where necessary.
*/

const blog = defineCollection({
	loader: glob(
		{
			base: './src/content/blog',
			pattern: '**/*.{md,mdx}',
			generateId: ({ entry, data }) => {
				let providedId = <string>data.id;
				if (providedId) {
					entry = path.join(path.dirname(entry), providedId);
				}

				const id = generateId(entry);
				return id;
			}
		}),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		cover: image(), // alt text is effectively the description field
		// instead of the full path or "single path", we use "{dir}/id/"
		id: z.string().optional(),
	}),
});

export const collections = { blog };

// is a more concise implementation of the default id generator
function generateId(entry: string): string {
	const p = path.parse(entry);
	entry = path.join(p.dir, p.name);
	const segments = entry.split(path.sep);
	if (segments.at(-1) == 'index') segments.pop();

	const slug = segments.map(s => githubSlug(s)).join('/');
	return slug;
}