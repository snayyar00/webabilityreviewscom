// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "WebAbility.io Reviews";
export const SITE_DESCRIPTION =
	"WebAbility.io reviews from verified AppSumo purchasers — 4.9 out of 5 across 26 ratings. Real feedback on the AI accessibility widget for ADA, WCAG, AODA and Section 508 compliance, including what reviewers say needs work.";

/** Rating figures as published on the AppSumo listing. */
export const APPSUMO_PRODUCT_URL = "https://appsumo.com/products/webabilityio/";
export const APPSUMO_REVIEWS_URL =
	"https://appsumo.com/products/webabilityio/reviews/";
export const PRODUCT_URL = "https://www.webability.io/";
export const SITE_URL = "https://webabilityreviews.com";

export const RATING_AVERAGE = 4.9;
export const RATING_TOTAL = 26;
/** How many of those reviews are reproduced on this site. */
export const REVIEWS_PUBLISHED = 8;

/**
 * Keyword targets, one cluster per page.
 *
 * Chosen for a brand-new low-authority domain: brand terms and buyer-intent
 * long-tail, where competition is near zero and intent is highest. Deliberately
 * NOT targeting head terms like "accessibility" (vol 8000, KD 60) or "web
 * accessibility checker" (KD 50) — this site has no authority to win those, and
 * webability.io already owns that cluster.
 *
 * NOTE: search volume for the brand terms below is unmeasured. The Feb 2026
 * SE Ranking pull covers the color-contrast cluster only.
 */
export const KEYWORDS = {
	home: [
		"webability review",
		"webability.io review",
		"webability reviews",
		"webability appsumo review",
		"is webability legit",
		"webability lifetime deal",
		"accessibility widget reviews",
	],
	agencies: [
		"white label accessibility widget",
		"accessibility widget for agencies",
		"resell ada compliance",
		"white label ada compliance",
		"accessibility compliance for client websites",
		"ada compliance for web design agencies",
		"bulk website accessibility for agencies",
	],
	reviews: [
		"webability reviews",
		"webability appsumo reviews",
		"webability customer reviews",
		"webability ratings",
	],
	about: [
		"is webability legit",
		"webability.io review",
		"who owns webability",
		"webability accessibility platform",
	],
} as const;
