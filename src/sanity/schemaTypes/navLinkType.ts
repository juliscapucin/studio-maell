import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const navLinkType = defineType({
	name: 'navLink',
	title: 'NavLink',
	type: 'document',
	icon: LinkIcon,
	fields: [
		defineField({
			name: 'label',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'label',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'order',
			type: 'number',
			title: 'Order',
			validation: (Rule) => Rule.required(),
		}),
	],
	orderings: [
		{
			title: 'Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
})
