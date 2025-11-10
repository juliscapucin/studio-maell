import { ListIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
	name: 'service',
	title: 'Service',
	type: 'document',
	icon: ListIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'description',
			type: 'text',
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
