import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import Image1 from '../assets/O3.jpg';
import Image2 from '../assets/H1.jpg';
import Image3 from '../assets/O4.jpg';

const Card = ({ number, title, content, image, hoverImage, link }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        VanillaTilt.init(cardRef.current, {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 1,
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative w-[600px] h-[350px] m-4 shadow-lg rounded-xl bg-black bg-opacity-0 backdrop-filter backdrop-blur-md flex justify-center items-center border border-black overflow-hidden transition-transform duration-500 hover:scale-105 group"
        >

            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
            />

            {hoverImage && (
                <img
                    src={hoverImage}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-10"
                />
            )}

            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-70"></div>

            <div className="p-5 text-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 relative z-10">
                <h2 className="absolute top-[-150px] right-2 text-[13em] text-black text-opacity-5 pointer-events-none">
                    {number}
                </h2>
                <h3 className="text-4xl text-white mb-8">{title}</h3>
                <p className="text-base text-white text-justify mb-8">{content}</p>
                <button className="px-4 py-2 bg-black text-white rounded-full shadow-lg">
                    Read More
                </button>
                <Link to={link}>
                    <button className="px-4 py-2 bg-black text-white rounded-full shadow-lg ml-2">
                        Run!
                    </button>
                </Link>
            </div>
        </div>
    );
};

const Cards = () => {
    return (
        <div className="flex-1 flex gap-12 items-center justify-center space-x-24 h-full">
            <Card
                number="01"
                title="Chiller Plant Optimizer"
                content="AI-driven solution to optimize the efficiency of chiller plants by predicting key operational variables using a Random Forest algorithm. This AI model will enable real-time adjustments to the plant's parameters, optimizing energy consumption and enhancing overall performance."
                image={Image1}
                hoverImage={Image2}
                link="/optimize"
            />
            <Card
                number="02"
                title="Fault Detection"
                content="Fault detection system utilizes real-time sensor data to identify potential faults or malfunctions in critical components. This system is designed to predict the likelihood of various faults, enabling timely maintenance and reducing downtime. We can prevent costly failures and maintain the smooth operation of the chiller plant."
                image={Image3}
                hoverImage={Image1}
                link="/fault"
            />
        </div>
    );
};

export default Cards;
