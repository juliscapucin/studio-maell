import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const connectPageType = defineType({
	name: 'connectPage',
	title: 'Connect',
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
		defineField({
			name: 'cta',
			type: 'string',
		}),
		defineField({
			name: 'email',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'socials',
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
						{
							name: 'url',
							title: 'URL',
							type: 'url',
						},
					],
				},
			],
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
