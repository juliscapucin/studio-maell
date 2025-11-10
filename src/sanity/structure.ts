import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title('Blog')
		.items([
			S.documentTypeListItem('project').title('Projects'),
			S.documentTypeListItem('category').title('Categories'),
			S.documentTypeListItem('author').title('Authors'),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					!['project', 'category', 'author'].includes(item.getId()!)
			),
		])
