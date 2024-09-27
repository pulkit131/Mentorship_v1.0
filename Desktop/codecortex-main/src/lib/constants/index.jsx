import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

import { AiFillEdit } from "react-icons/ai";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'faq',
		label: 'FAQ',
		path: '/FAQ',
		icon: <HiOutlineCube />
	},
	{
		key: 'overview',
		label: 'Overview',
		path: '/overview',
		icon: <AiFillEdit />
	},
	{
		key: 'news',
		label: 'News',
		path: '/news',
		icon: <HiOutlineUsers />
	},
	{
		key: 'team',
		label: 'Team',
		path: '/team',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'contactus',
		label: 'ContactUs',
		path: '/contactus',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
