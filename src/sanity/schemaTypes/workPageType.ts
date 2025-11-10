import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const workPageType = defineType({
	name: 'workPage',
	title: 'Work',
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
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
