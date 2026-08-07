/**
 * Schema.org builders.
 *
 * Scope note: this site is published by the WebAbility team, so the reviews
 * are self-serving under Google's review-snippet policy and will most likely
 * NOT earn star rich results in Google Search. The markup is here because it
 * is still the cleanest machine-readable statement of who said what, which is
 * what LLM crawlers and answer engines actually consume.
 *
 * Every figure below must be traceable to the AppSumo listing. Do not add
 * customer counts, press mentions, certifications or competitor comparisons
 * to this file.
 */
import {
	APPSUMO_PRODUCT_URL,
	APPSUMO_REVIEWS_URL,
	PRODUCT_URL,
	RATING_AVERAGE,
	RATING_TOTAL,
	SITE_TITLE,
	SITE_DESCRIPTION,
} from "../consts";

const SITE_URL = "https://webabilityreviews.com";

export interface ReviewData {
	title: string;
	description: string;
	pubDate: Date;
	reviewer: string;
	rating: number;
	sourceUrl: string;
	source: string;
	quote?: string;
	slug: string;
}

/** The product every review on this site is about. */
export function productSchema(reviews: ReviewData[] = []) {
	return {
		"@type": "SoftwareApplication",
		"@id": `${SITE_URL}/#product`,
		name: "WebAbility.io",
		description:
			"AI-powered web accessibility platform. Scans for barriers in content, navigation, forms and media, automatically corrects the items that are safe to change, and routes the rest to human review.",
		url: PRODUCT_URL,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		offers: {
			"@type": "Offer",
			url: APPSUMO_PRODUCT_URL,
			price: "59",
			priceCurrency: "USD",
			category: "One-time purchase (lifetime deal)",
			availability: "https://schema.org/InStock",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: RATING_AVERAGE,
			reviewCount: RATING_TOTAL,
			bestRating: 5,
			worstRating: 1,
			url: APPSUMO_REVIEWS_URL,
		},
		...(reviews.length
			? { review: reviews.map((r) => reviewSchema(r, { nested: true })) }
			: {}),
	};
}

/** A single customer review, attributed to its author and its source. */
export function reviewSchema(r: ReviewData, opts: { nested?: boolean } = {}) {
	const base: Record<string, unknown> = {
		"@type": "Review",
		name: r.title,
		reviewBody: r.description,
		datePublished: r.pubDate.toISOString().slice(0, 10),
		url: `${SITE_URL}/reviews/${r.slug}/`,
		author: { "@type": "Person", name: r.reviewer },
		publisher: { "@type": "Organization", name: r.source },
		reviewRating: {
			"@type": "Rating",
			ratingValue: r.rating,
			bestRating: 5,
			worstRating: 1,
		},
		// Point machines at the original, not at our copy.
		isBasedOn: r.sourceUrl,
		sameAs: r.sourceUrl,
	};
	if (!opts.nested) {
		base.itemReviewed = {
			"@type": "SoftwareApplication",
			"@id": `${SITE_URL}/#product`,
			name: "WebAbility.io",
			url: PRODUCT_URL,
			applicationCategory: "BusinessApplication",
			operatingSystem: "Web",
		};
	}
	return base;
}

/** Who publishes this site. Stated plainly so it is never mistaken for third-party. */
export function publisherSchema() {
	return {
		"@type": "Organization",
		"@id": `${SITE_URL}/#publisher`,
		name: "TechyWeb Solutions Inc.",
		url: SITE_URL,
		brand: { "@type": "Brand", name: "WebAbility.io", url: PRODUCT_URL },
		description:
			"Publisher of webabilityreviews.com. Reviews on this site were written by verified AppSumo purchasers, not by TechyWeb Solutions.",
	};
}

export function websiteSchema() {
	return {
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		name: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		publisher: { "@id": `${SITE_URL}/#publisher` },
	};
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: trail.map((t, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: t.name,
			item: `${SITE_URL}${t.path}`,
		})),
	};
}

export function faqSchema(qas: Array<{ q: string; a: string }>) {
	return {
		"@type": "FAQPage",
		mainEntity: qas.map(({ q, a }) => ({
			"@type": "Question",
			name: q,
			acceptedAnswer: { "@type": "Answer", text: a },
		})),
	};
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(...nodes: unknown[]) {
	return {
		"@context": "https://schema.org",
		"@graph": nodes.filter(Boolean),
	};
}
