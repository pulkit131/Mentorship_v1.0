import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/constants'
import logo from "./logo2.png";

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Header() {
	const { pathname } = useLocation()

	return (
		<div className="bg-[#001F3F] h-20 w-full flex items-center justify-between px-4 border-b border-gray-200">

			<div className="flex items-center gap-2">
			<img src={logo} alt="logo" className="w-16 h-16 "/>
				<span className="text-[#98DED9] text-2xl">SmartChill</span>
			</div>

			<div className="flex gap-4 ml-auto">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<Link
						key={link.key}
						to={link.path}
						className={classNames(
							pathname === link.path ? 'bg-[#98DED9] text-[#001F3F] hover:bg-[#6A9DF0]' : 'text-[#98DED9] hover:text-[#6A9DF0]',
							'flex items-center gap-2 px-3 py-2 text-base rounded-sm'
						)}
					>
						<span className="text-xl">{link.icon}</span>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	)
}
