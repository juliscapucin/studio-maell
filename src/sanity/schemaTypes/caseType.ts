import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const caseType = defineType({
	name: 'case',
	title: 'Case',
	type: 'document',
	icon: DocumentTextIcon,
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
				source: 'title',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'client',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'mainImage',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					title: 'Alternative text',
				}),
			],
		}),
		defineField({
			name: 'services',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'label',
							title: 'Label',
							type: 'string',
						},
					],
				},
			],
		}),
		defineField({
			name: 'role',
			type: 'string',
		}),
		defineField({
			name: 'publishedOn',
			type: 'datetime',
		}),
		defineField({
			name: 'body',
			type: 'blockContent',
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'mainImage',
		},
		prepare(selection) {
			const { title } = selection
			return { ...selection, subtitle: title && `by ${title}` }
		},
	},
})
