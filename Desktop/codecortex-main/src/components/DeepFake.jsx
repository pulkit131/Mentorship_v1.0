import React, { useState } from "react";
import axios from 'axios';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRun = () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);
            axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error("There was an error uploading the image!", error);
            });
        } else {
            alert("Please upload an image first.");
        }
    };

    const formatJSON = (json) => {
        if (typeof json !== 'object') {
            return <span className={json === 'Fake' ? 'text-red-500' : 'text-green-500'}>{json}</span>;
        }
        return (
            <ul className="list-none pl-4">
                {Object.entries(json).map(([key, value]) => (
                    <li key={key} className="my-1">
                        <span className="font-semibold text-blue-600">{key}:</span>{' '}
                        {typeof value === 'object' ? (
                            formatJSON(value)
                        ) : (
                            <span className={value === 'fake' ? 'text-red-500' : (value === 'real' ? 'text-green-500' : 'text-gray-600')}>
                                {JSON.stringify(value)}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
            />
           
            <button
                onClick={handleRun}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Run
            </button>

            <div className="flex w-full gap-4 mt-4">
                {imagePreview && (
                    <div className="w-1/2">
                        <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                    </div>
                )}

                {result && (
                    <div className="w-1/2 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                        <h2 className="font-bold text-lg mb-2 text-center">Prediction Result:</h2>
                        <div className="overflow-auto max-h-60">
                            {formatJSON(result)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;