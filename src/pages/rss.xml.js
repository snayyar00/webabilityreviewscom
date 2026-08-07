import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		// Map explicit fields only. Spreading `post.data` would leak the
		// review-specific keys (rating, reviewer, sourceUrl) into the feed.
		items: posts.map((post) => ({
			title: `${post.data.title} — ${post.data.reviewer} (${post.data.rating}/5)`,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/reviews/${post.id}/`,
		})),
	});
}
