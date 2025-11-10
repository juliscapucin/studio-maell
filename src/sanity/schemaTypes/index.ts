import { type SchemaTypeDefinition } from 'sanity'

import { articleType } from './articleType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { caseType } from './caseType'
import { connectPageType } from './connectPageType'
import { serviceType } from './serviceType'
import { workPageType } from './workPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		articleType,
		authorType,
		blockContentType,
		categoryType,
		caseType,
		connectPageType,
		serviceType,
		workPageType,
	],
}
