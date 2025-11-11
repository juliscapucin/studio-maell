import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			// Pages section
			S.listItem()
				.title('Pages')
				.child(
					S.list()
						.title('Pages')
						.items([
							S.listItem()
								.title('Work')
								.child(
									S.document().schemaType('workPage').documentId('workPage')
								),
							S.listItem()
								.title('Connect')
								.child(
									S.document()
										.schemaType('connectPage')
										.documentId('connectPage')
								),
						])
				),
			S.divider(),
			// Collections section
			S.listItem()
				.title('Collections')
				.child(
					S.list()
						.title('Collections')
						.items([
							S.documentTypeListItem('article').title('Articles'),
							S.documentTypeListItem('case').title('Cases'),
							S.documentTypeListItem('category').title('Categories'),
							S.documentTypeListItem('navLink')
								.title('NavLinks')
								.child(
									S.documentList()
										.title('NavLinks')
										.filter('_type == "navLink"')
										.defaultOrdering([{ field: 'order', direction: 'asc' }])
								),
							S.documentTypeListItem('service').title('Services'),
						])
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					![
						'article',
						'case',
						'category',
						'connectPage',
						'navLink',
						'service',
						'workPage',
					].includes(item.getId()!)
			),
		])
