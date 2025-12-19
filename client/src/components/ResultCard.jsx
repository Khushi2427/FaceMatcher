import React from "react";

export default function ResultCard({ actor, image, similarity, userFace, loading, uploadedImage }) {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100 animate-pulse">
                <div className="h-64 bg-green-50 rounded-lg mb-4"></div>
                <div className="h-6 bg-green-50 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-green-50 rounded w-1/2 mx-auto"></div>
                <div className="mt-4 flex justify-center">
                    <div className="h-10 bg-green-50 rounded-lg w-40"></div>
                </div>
            </div>
        );
    }
    
    if (!actor) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-green-100">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Ready to Find Your Match?</h3>
                <p className="text-gray-600 mb-6">Upload your photo to discover your Bollywood lookalike!</p>
                {uploadedImage && (
                    <div className="mb-6">
                        <img 
                            src={uploadedImage} 
                            alt="Uploaded preview" 
                            className="w-32 h-32 rounded-lg object-cover mx-auto shadow-md"
                        />
                        <p className="text-sm text-green-600 mt-2">Photo uploaded ✓</p>
                    </div>
                )}
                <div className="flex items-center justify-center text-green-500">
                    <svg className="animate-pulse h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Awaiting analysis...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
            <div className="p-6">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-1">
                        You look like <span className="text-green-600">{actor}</span>!
                    </h3>
                    <p className="text-gray-600 text-sm">Based on facial feature analysis</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                        <div className="mb-3">
                            <h4 className="font-semibold text-green-700 mb-1">Your Face</h4>
                            <span className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full">Uploaded Image</span>
                        </div>
                        <div className="relative group">
                            <img 
                                src={`${import.meta.env.VITE_API_URL}/${userFace}`} 
                                alt="Your face" 
                                className="w-full h-56 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                onError={(e) => {
                                    e.target.src = '/default-user.jpg';
                                    e.target.classList.add('opacity-80');
                                }}
                            />
                            <div className="absolute inset-0 bg-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <div className="mb-3">
                            <h4 className="font-semibold text-green-700 mb-1">Celebrity Match</h4>
                            <span className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full">Bollywood Star</span>
                        </div>
                        <div className="relative group">
                            {image ? (
                                <img 
                                    src={`${import.meta.env.VITE_API_URL}/bollywood/${image}`}
                                    alt={actor}
                                    className="w-full h-56 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                    onError={(e) => {
                                        e.target.src = '/default-actor.jpg';
                                        e.target.classList.add('opacity-80');
                                    }}
                                />
                            ) : (
                                <div className="w-full h-56 bg-green-50 rounded-xl flex items-center justify-center shadow-sm">
                                    <div className="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-500 text-sm">Image not available</span>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
                
                {/* Similarity Score */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 mb-6">
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-3">
                            <h4 className="font-semibold text-green-700 mb-1">Similarity Score</h4>
                            <p className="text-xs text-gray-600">Based on 128 facial feature comparisons</p>
                        </div>
                        
                        {/* Circular Progress */}
                        <div className="relative w-32 h-32 mb-4">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke="#dcfce7" 
                                    strokeWidth="8"
                                />
                                {/* Progress circle */}
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke="#16a34a" 
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${similarity * 283} 283`}
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-green-700">
                                    {(similarity * 100).toFixed(1)}%
                                </span>
                                <span className="text-xs text-green-600 font-medium">Match</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                                    <span className="text-xs text-gray-600">Excellent Match</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                {similarity >= 0.8 
                                    ? "Excellent match! You have strong facial similarities."
                                    : similarity >= 0.6
                                    ? "Good match! Several key features align."
                                    : "Interesting match! Some distinctive features in common."}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Action Buttons
                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center">
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Share Result
                    </button>
                    <button className="flex-1 py-3 bg-white border border-green-200 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors duration-300 shadow-sm hover:shadow-md flex items-center justify-center">
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Try Again
                    </button>
                </div> */}
            </div>
        </div>
    );
}