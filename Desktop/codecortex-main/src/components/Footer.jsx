import 'boxicons/css/boxicons.min.css';

export default function Footer() {
	return (
		<footer className="w-full flex flex-col pb-1 justify-between border-t border-gray-400 bg-[#001F3F] text-white">
			<div className="flex flex-wrap justify-between items-start p-2 pt-14 pr-16">
				<div className="ml-2 max-w-[30%] flex flex-col justify-between">
					<h2 className="text-4xl text-[#98DED9] mb-2">SmartChill</h2>
					<p className="text-gray-40 text-xs">
					This project aims to develop an advanced system for optimizing chiller plant operations and detecting potential faults using AI-driven models. The solution incorporates machine learning algorithms to enhance the efficiency of chiller plants by predicting the necessary variables required for optimal performance, as well as detecting faults in real time.

					</p>
				</div>

				<div className="flex flex-col">
					<h4 className="text-lg">Quick Access</h4>
					<ul className="mt-1">
						<li className="mt-1 mb-1">
							<a href="/" className="text-[#98DED9] hover:text-[#6A9DF0]">Home</a>
						</li>
						<li className="mt-1 mb-1">
							<a href="/faq" className="text-[#98DED9] hover:text-[#6A9DF0]">FAQ</a>
						</li>
						<li className="mt-1 mb-1">
							<a href="/overview" className="text-[#98DED9] hover:text-[#6A9DF0]">Overview</a>
						</li>
					</ul>
				</div>

				<div className="flex flex-col">
					<h4 className="text-lg">Help &amp; Support</h4>
					<ul className="mt-1">
					<li className="mt-1 mb-1">
							<a href="/team" className="text-[#98DED9] hover:text-[#6A9DF0]">Team</a>
						</li>
						<li className="mt-1 mb-1">
							<a href="/contactus" className="text-[#98DED9] hover:text-[#6A9DF0]">Contact Us</a>
						</li>
						
						
					</ul>
				</div>

				<div className="flex flex-col">
					<h4 className="text-lg">Socials</h4>
					<ul className="mt-1">
						<li className="mt-1 mb-1">
							<a href="https://medium.com/@tam_vit" className="text-[#98DED9] hover:text-[#6A9DF0]">Medium</a>
						</li>
						<li className="mt-1 mb-1">
							<a href="https://www.linkedin.com/company/tam-vit/?originalSubdomain=in" className="text-[#98DED9] hover:text-[#6A9DF0]">LinkedIn</a>
						</li>
						<li className="mt-1 mb-1">
							<a href="https://www.instagram.com/tam.vit_vellore/" className="text-[#98DED9] hover:text-[#6A9DF0]">Instagram</a>
						</li>
					</ul>
				</div>

				
			</div>
			<hr className="w-full border-gray-400 mt-1" />
			<p className="text-gray-40 text-center text-sm mt-2 pt-5 pb-5">
				Created with ❤️ by team The Smart Chillers (Team ID : 10708)
			</p>
		</footer>
	);
}
