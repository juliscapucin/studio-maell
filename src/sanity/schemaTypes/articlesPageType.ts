import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const articlesPageType = defineType({
	name: 'articlesPage',
	title: 'Articles',
	type: 'document',
	icon: ComposeIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'subtitle',
			type: 'string',
		}),
		{ name: 'metadataTitle', title: 'Metadata Title', type: 'string' },
		{
			name: 'metadataDescription',
			title: 'Metadata Description',
			type: 'string',
		},
		{
			name: 'metadataKeywords',
			title: 'Metadata Keywords',
			type: 'array',
			of: [{ type: 'string' }],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
