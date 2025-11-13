// src/utils/index.ts
export function cleanSanityInputs(input?: unknown): string {
	if (typeof input === 'string') {
		return input.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
	}

	if (Array.isArray(input)) {
		// Join arrays like keywords: ['Design', 'Accessibility']
		return input
			.map((item) =>
				typeof item === 'string'
					? item.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
					: ''
			)
			.filter(Boolean)
			.join(', ')
	}

	return ''
}
