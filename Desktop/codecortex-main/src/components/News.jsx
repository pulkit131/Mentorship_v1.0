import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsSection = () => {
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything`, {
                    params: {
                        q: 'AI OR energy efficiency OR sustainable OR chiller systems',
                        pageSize: 5,
                        apiKey: '748c06cb42284e3c9574920779353f08'
                    }
                });

                setNewsItems(response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="p-8 bg-black">
            <h1 className="text-4xl mb-8 text-center text-[#6A9DF0] uppercase tracking-wide relative animate-bubbleUp">
                <span>Latest </span> News
                <span className="block w-24 h-1 bg-blue-500 mx-auto mt-4"></span>
            </h1>
            <div className="flex flex-wrap gap-8 justify-center">
                {newsItems.map((news, index) => (
                    <div key={index} className="bg-black border-2 border-gray-600 rounded-lg p-4 w-1/3 h-96 shadow-lg transform transition-transform duration-300 hover:translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden">
                        {news.urlToImage && <img src={news.urlToImage} alt={news.title} className="w-full h-48 object-cover rounded-lg" />}
                        <div className="flex flex-col justify-between flex-grow p-4">
                            <h2 className="text-2xl mb-2 text-[#6A9DF0] transition-colors duration-300 hover:text-blue-400">{news.title}</h2>
                            <p className="text-lg mb-2 text-gray-300 line-clamp-3 flex-grow">{news.description}</p>
                            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider text-right">{news.source.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
