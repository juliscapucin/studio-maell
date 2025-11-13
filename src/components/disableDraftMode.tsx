'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { disableDraftMode } from '@/app/actions'
import { useDraftModeEnvironment } from 'next-sanity/hooks'

export default function DisableDraftMode() {
	const router = useRouter()
	const [pending, startTransition] = useTransition()
	const environment = useDraftModeEnvironment()

	// Only show the disable draft mode button when outside of Presentation Tool
	if (environment !== 'live' && environment !== 'unknown') {
		return null
	}

	const disable = () =>
		startTransition(async () => {
			await disableDraftMode()
			router.refresh()
		})

	return (
		<div>
			{pending ? (
				'Disabling draft mode...'
			) : (
				<button type='button' onClick={disable} className='fixed z-100'>
					Disable draft mode
				</button>
			)}
		</div>
	)
}
