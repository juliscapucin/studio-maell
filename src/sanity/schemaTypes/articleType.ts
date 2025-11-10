import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const articleType = defineType({
	name: 'article',
	title: 'Article',
	type: 'document',
	icon: ComposeIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publication',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
