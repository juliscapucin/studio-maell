import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { projectType } from './projectType'
import { authorType } from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [blockContentType, categoryType, projectType, authorType],
}
