import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Img1 from "../assets/C1.png"

const Carousel = () => {
    const fadeIn = "transition-opacity duration-700 opacity-0";
    console.log(Img1)
    const [items, setItems] = useState([
        
        {
            backgroundImage: "https://i.pinimg.com/originals/e5/f9/d5/e5f9d5265ccb6969696f69663091ca15.gif",
            name: "Medical Image Synthesizer",
            description: "AI systems that generate synthetic medical images (e.g., X-rays, MRIs) to augment datasets for research and training, addressing privacy issues in real medical data.",
        },
        {
            backgroundImage: "https://i.pinimg.com/originals/81/17/8b/81178b47a8598f0c81c4799f2cdd4057.gif",
            name: "Deep-Fake Img Recognition",
            description: "Deepfake image recognition uses a CNN to distinguish real from manipulated images, training on a dataset to detect subtle artifacts.",
        },
        {
            backgroundImage: "https://i.pinimg.com/originals/29/24/62/2924624b72ad602afebc66b4cb862a11.gif",
            name: "Medical Prescription Analyzer",
            description: "A medical prescription analyzer leverages machine learning to extract medication names and dosages from prescriptions, improving accuracy and reducing errors in patient care.",
        },
        {
            backgroundImage: "https://i.pinimg.com/originals/81/17/8b/81178b47a8598f0c81c4799f2cdd4057.gif",
            name: "Deep-Fake Img Recognition",
            description: "Deepfake image recognition uses a CNN to distinguish real from manipulated images, training on a dataset to detect subtle artifacts.",
        },
        {
            backgroundImage: "https://i.pinimg.com/originals/29/24/62/2924624b72ad602afebc66b4cb862a11.gif",
            name: "Medical Prescription Analyzer",
            description: "A medical prescription analyzer leverages machine learning to extract medication names and dosages from prescriptions, improving accuracy and reducing errors in patient care.",
        },
        
    ]);

    useEffect(() => {
        const link = document.createElement("link");
        link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    const handleNext = () => {
        setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
    };

    const handlePrev = () => {
        setItems((prevItems) => [
            prevItems[prevItems.length - 1],
            ...prevItems.slice(0, -1),
        ]);
    };

    return (
        <div className="relative w-full h-[550px] mr-80">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-full">
                <div className="relative w-full h-full">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute top-1/2 transform -translate-y-1/2 w-[200px] h-[300px] rounded-[20px] shadow-lg bg-cover bg-center transition-all duration-500 ${index === 0
                                ? "left-0 top-0 w-full h-full rounded-none"
                                : index === 1
                                    ? "left-1/2"
                                    : index === 2
                                        ? "left-[calc(50%+220px)]"
                                        : index === 3
                                            ? "left-[calc(50%+440px)]"
                                            : "left-[calc(50%+660px)] opacity-0"
                                }`}
                            style={{ backgroundImage: `url(${item.backgroundImage})` }}
                        >
                            
                            {index === 0 && (
                                <div
                                    className={`w-[400px] pl-[20px] h-full flex flex-col items-center justify-center text-center text-white ${fadeIn} animate-fadeIn opacity-100`}
                                    style={{ opacity: 1 }} 
                                >
                                    <h2 className="text-4xl font-bold uppercase">{item.name}</h2>
                                    <p className="mt-2 mb-5 animation-delay-300">{item.description}</p>
                                    
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-5 w-full text-center">
                <button
                    className="w-10 h-[35px] rounded-lg border border-black mx-1.5 transition-colors duration-300 hover:bg-[#ababab] hover:text-white"
                    onClick={handlePrev}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                    className="w-10 h-[35px] rounded-lg border border-black mx-1.5 transition-colors duration-300 hover:bg-[#ababab] hover:text-white"
                    onClick={handleNext}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default Carousel;
