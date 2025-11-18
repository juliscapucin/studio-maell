'use client'

import { useState } from 'react'

type CaseServicesProps = {
	services: string[]
}

export default function CaseServices({ services }: CaseServicesProps) {
	const [showAllServices, setShowAllServices] = useState(false)
	return (
		<div className='flex-2'>
			<h2 className='text-lg font-medium mb-4'>Services</h2>

			{/* SERVICES DESKTOP */}
			<ul
				className={`flex-wrap gap-2 ${showAllServices ? 'flex' : 'hidden md:flex'}`}>
				{services.map((service: string) => (
					<li className='pill' key={service}>
						{service}
					</li>
				))}

				{/* SHOW "SHOW LESS" BUTTON IF ALL SERVICES ARE SHOWN ON MOBILE */}
				{showAllServices && (
					<button
						className='underline text-[#4338CA] text-lg mt-1 ml-2 md:hidden'
						onClick={() => setShowAllServices(!showAllServices)}>
						Show less
					</button>
				)}
			</ul>
			{/* SERVICES MOBILE */}
			<ul
				className={`flex md:hidden flex-wrap gap-2 ${showAllServices ? 'hidden' : 'flex'}`}>
				{services.map((service: string, index: number) => {
					if (index < 2) {
						return (
							<li className='pill' key={service}>
								{service}
							</li>
						)
					}
				})}

				{/* SHOW "+X MORE" IF MORE THAN 2 SERVICES */}
				{services.length > 2 && (
					<button
						className='underline text-[#4338CA] text-lg mt-1 ml-2'
						onClick={() => setShowAllServices(!showAllServices)}>
						+{services.length - 2} more
					</button>
				)}
			</ul>
		</div>
	)
}
