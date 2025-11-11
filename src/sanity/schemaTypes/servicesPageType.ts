import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
	name: 'servicesPage',
	title: 'Services',
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
