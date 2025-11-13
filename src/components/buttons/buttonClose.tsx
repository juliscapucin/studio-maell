import { IconClose } from '@/components/icons'

type ButtonCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	classes?: string
}

export default function ButtonClose({ classes, ...props }: ButtonCloseProps) {
	return (
		<button
			className={`group relative flex items-center gap-1 h-6  ${classes || ''}`}
			{...props}>
			<div className='relative h-6 w-6 flex items-center justify-center'>
				<IconClose />
			</div>
			<span className='uppercase underline'>Close</span>
		</button>
	)
}
