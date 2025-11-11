import { PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { getAllCases, getWorkPageContent } from '@/sanity/lib/queries'

export default async function Work() {
	const data = await getWorkPageContent()
	const cases = await getAllCases()
	return (
		<PageWrapper>
			<PageHeader title={data.title} subtitle={data.subtitle}></PageHeader>
			<div className='space-y-8'>
				{cases.map((caseItem) => (
					<CaseCard key={caseItem.slug} caseData={caseItem}></CaseCard>
				))}
			</div>
		</PageWrapper>
	)
}
