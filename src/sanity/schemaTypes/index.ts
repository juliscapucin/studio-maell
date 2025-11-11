import { type SchemaTypeDefinition } from 'sanity'

import { articleType } from './articleType'
import { articlesPageType } from './articlesPageType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { caseType } from './caseType'
import { connectPageType } from './connectPageType'
import { navLinkType } from './navLinkType'
import { serviceType } from './serviceType'
import { servicesPageType } from './servicesPageType'
import { workPageType } from './workPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		articleType,
		articlesPageType,
		blockContentType,
		categoryType,
		caseType,
		connectPageType,
		navLinkType,
		serviceType,
		servicesPageType,
		workPageType,
	],
}
