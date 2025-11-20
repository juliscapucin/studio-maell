const baseUrl = 'https://studio-maell.vercel.app'

export const PAGES = [
	{
		url: baseUrl,
		title: 'Studio Maell | Work',
		heading: 'Work',
		pageName: 'homepage',
	},
	{
		url: `${baseUrl}/work`,
		title: 'Studio Maell | Work',
		heading: 'Work',
		pageName: 'work',
	},
	{
		url: `${baseUrl}/services`,
		title: 'Studio Maell | Services',
		heading: 'Services',
		pageName: 'services',
	},
	{
		url: `${baseUrl}/articles`,
		title: 'Studio Maell | Articles',
		heading: 'Articles',
		pageName: 'articles',
	},
	{
		url: `${baseUrl}/connect`,
		title: 'Studio Maell | Connect',
		heading: 'Connect',
		pageName: 'connect',
	},
	{
		url: `${baseUrl}/work/improving-machine-management-by-creating-a-100-digital-user-journey`,
		title: 'Studio Maell | Case',
		heading:
			'Improving machine management by creating a 100% digital user journey',
		pageName: 'case',
	},
]

export const singlePageDefinition = (PAGE_NAME: string) => {
	return PAGES.find((page) => page.pageName === PAGE_NAME)
}
