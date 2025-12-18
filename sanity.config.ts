'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

// import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import '@/sanity/styles/studio.css'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
// import { presentationTool } from 'sanity/presentation'
// import { mainDocuments, locations } from './src/sanity/lib/presentation/resolve'

export default defineConfig({
	basePath: '/studio',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({ structure }),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		// visionTool({
		// 	defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
		// }),
		// presentationTool({
		// 	resolve: { locations, mainDocuments },
		// 	previewUrl: {
		// 		initial: '/',
		// 		previewMode: {
		// 			enable: '/api/draft-mode/enable',
		// 		},
		// 	},
		// }),
	],
})
