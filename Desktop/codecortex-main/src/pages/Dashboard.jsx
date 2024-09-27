import React, { useRef } from 'react';
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import Cards from '../components/Cards'

export default function Dashboard() {
	const cardsRef = useRef(null);

    const scrollToCards = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid onButtonClick={scrollToCards}  />
			<div className="flex flex-row gap-4 w-full" ref={cardsRef}>
				<Cards />
			</div>
			<div className="flex flex-row gap-4 w-full">
			</div>
		</div>
	)
}
