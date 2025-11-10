import { ButtonBack } from '@/components/buttons'
import { PageWrapper } from '@/components/ui'

export default async function Project({
	params,
}: {
	params: Promise<{ artist: string }>
}) {
	return (
		<PageWrapper>
			<div className='bg-secondary text-tertiary rounded-sm relative p-6'>
				<ButtonBack />
				<h1 className='heading-headline text-pretty'>
					Improving machine management by creating a 100% digital user journey
				</h1>
				<p className='mt-4'>Jacob Douwe Egberts Professsional</p>
				<hr className='my-4 border-tertiary' />
				<div className='flex'>
					<div className='flex-2'>
						<h2>Services</h2>
						<div className='flex gap-2 flex-wrap'>
							<div className='pill'>Stakeholder management</div>
							<div className='pill'>Stakeholder management</div>
							<div className='pill'>Stakeholder management</div>
							<div className='pill'>Stakeholder management</div>
						</div>
					</div>
					<div className='flex-1'>
						<h2>Role</h2>
						<p>Lead Designer</p>
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}
