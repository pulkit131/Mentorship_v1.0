import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
	return (
		<div className="bg-gray-200 min-h-screen h-full w-full overflow-hidden flex flex-col">

			<Header />
			
			<div className="flex-1 p-4 min-h-0 overflow-y-auto bg-gray-200">
				<Outlet />
			</div>
		</div>
	)
}
