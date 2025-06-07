import React from "react";

export default function ResultCard({ actor, image, similarity, userFace, loading }) {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 text-center animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
        );
    }
    
    if (!actor) return null;
    
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-center mb-4">
                    You look like <span className="text-blue-600">{actor}</span>!
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                        <h4 className="font-medium text-gray-700 mb-2">Your Face</h4>
                        <img 
                            src={`http://localhost:5001/${userFace}`} 
                            alt="Your face" 
                            className="w-full h-64 object-cover rounded-lg"
                            onError={(e) => {
                                e.target.src = '/default-user.jpg';
                                e.target.classList.add('opacity-80');
                            }}
                        />
                    </div>
                    
                    <div className="text-center">
                        <h4 className="font-medium text-gray-700 mb-2">Match</h4>
                        {image ? (
                            <img 
                                src={`http://localhost:5001/bollywood/${image}`}
                                alt={actor}
                                className="w-full h-64 object-cover rounded-lg"
                                onError={(e) => {
                                    e.target.src = '/default-actor.jpg';
                                    e.target.classList.add('opacity-80');
                                }}
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Image not available</span>
                            </div>
                        )}
                        
                        <div className="mt-4 bg-blue-50 rounded-lg p-3 inline-block">
                            <span className="font-bold text-blue-700">
                                Similarity: {(similarity * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}