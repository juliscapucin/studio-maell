import { IconBurger } from '@/components/icons'

type ButtonBurgerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonBurger({ ...props }: ButtonBurgerProps) {
	return (
		<button {...props} aria-label='open menu'>
			<span className='flex items-center gap-2 underline'>
				<IconBurger />
				MENU
			</span>
		</button>
	)
}
