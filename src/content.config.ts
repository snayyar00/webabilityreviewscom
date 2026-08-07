import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// --- Review fields ---
		/** AppSumo handle of the reviewer, reproduced as published. */
		reviewer: z.string(),
		/** Taco rating out of 5, as published on AppSumo. */
		rating: z.number().min(1).max(5),
		/** Link back to the review on AppSumo. */
		sourceUrl: z.string().url(),
		/** Where the review was published. */
		source: z.string().default("AppSumo"),
		/** AppSumo marks the reviewer as a verified purchaser. */
		verified: z.boolean().default(true),
		/** Short pull-quote shown on cards and listings. */
		quote: z.string().optional(),
	}),
});

export const collections = { blog };
