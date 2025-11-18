import { PageType } from './PageType'

export type ConnectPageType = PageType & {
	cta?: string
	email?: string
	socials?: {
		label: string
		url: string
	}[]
}
