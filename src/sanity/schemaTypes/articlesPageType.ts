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
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
