import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';
import ResultCard from './ResultCard';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeStat, setActiveStat] = useState(null);

  // Rotate through feature highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (file) => {
    if (!file) {
      setResult(null);
      setUploadedImage(null);
      return;
    }
    
    // Create preview of uploaded image
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
    
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Simulated progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/match`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        timeout: 30000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(Math.min(percentCompleted, 90));
        }
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(response.data);
      
      // Small delay to show 100% progress
      setTimeout(() => setLoading(false), 500);
      
    } catch (err) {
      clearInterval(progressInterval);
      let errorMessage = 'An error occurred during processing';
      
      if (err.response?.data?.error) {
        errorMessage = `${err.response.data.error} (${err.response.data.code || 'UNKNOWN'})`;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out - please try again';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
      setProgress(100);
    }
  };

  const features = [
    {
      title: "Upload Your Photo",
      description: "Simply upload a clear photo of your face. Make sure your face is visible and well-lit for best results.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Advanced Analysis",
      description: "Our system analyzes 128 distinct facial features to find your closest celebrity match.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Get Your Results",
      description: "Receive your match with a similarity percentage and side-by-side comparison.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  const celebrities = [
    { name: "Shah Rukh Khan", match: "21% users" },
    { name: "Deepika Padukone", match: "18% users" },
    { name: "Amitabh Bachchan", match: "15% users" },
    { name: "Priyanka Chopra", match: "12% users" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="py-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-8 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  Discover Your <span className="text-green-600">Bollywood</span> Lookalike
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Upload your photo to find which Bollywood star you resemble the most. 
                  Our AI-powered facial recognition technology matches you with your celebrity twin!
                </p>
                
                <div className="mb-8">
                  <FileUpload 
                    onUpload={handleUpload} 
                    disabled={loading}
                    className="transform hover:scale-[1.02] transition-transform duration-300"
                  />
                  
                  {uploadedImage && !loading && !result && (
                    <div className="mt-6 flex items-center justify-center">
                      <div className="relative group">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded preview" 
                          className="w-32 h-32 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Preview
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {loading && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {progress < 100 ? 'Analyzing facial features...' : 'Finalizing results...'}
                      </span>
                      <span className="text-sm font-bold text-green-600">{progress}%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <svg className="animate-spin h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">Processing your image</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:w-1/2">
                <ResultCard 
                  actor={result?.actor}
                  image={result?.image}
                  similarity={result?.similarity}
                  userFace={result?.userFace}
                  loading={loading}
                  uploadedImage={uploadedImage}
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 animate-fade-in">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                      <p className="mt-1 text-sm text-red-600">Please try uploading a different image</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setError(null)}
                    className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700 transition-colors duration-200 p-1 hover:bg-red-100 rounded"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-10 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {celebrityStats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-green-100"
                onMouseEnter={() => setActiveStat(index)}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-300">
                  {stat.label}
                </div>
                {activeStat === index && (
                  <div className="mt-3 h-1 w-12 bg-gradient-to-r from-green-400 to-green-400 rounded-full mx-auto"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It <span className="text-green-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced facial recognition technology analyzes your features and matches them with Bollywood celebrities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-green from-white to-green-50 p-8 rounded-xl shadow-lg border border-green-100 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  featureIndex === index ? 'ring-2 ring-green-400 ring-opacity-30 shadow-green-100' : ''
                }`}
                onMouseEnter={() => setFeatureIndex(index)}
              >
                <div className={`mb-6 transition-all duration-300 transform ${featureIndex === index ? 'text-green-500 scale-110' : 'text-green-400'} flex justify-center`}>
                  <div className={`p-3 rounded-lg ${featureIndex === index ? 'bg-green-50' : ''}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
                {featureIndex === index && (
                  <div className="mt-6 flex items-center justify-center text-green-500 text-sm font-medium">
                    <span className="animate-pulse">• Current step</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Matches Section */}
      <div className="py-16 bg-gradient-to-green from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Popular <span className="text-green-600">Matches</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See which Bollywood stars our users most commonly match with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {celebrities.map((celebrity, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-green-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    {celebrity.name}
                  </h3>
                  <div className="text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full transition-all duration-700"
                      style={{ 
                        width: `${parseInt(celebrity.match)}%`
                      }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700 min-w-[60px]">{celebrity.match}</span>
                </div>
                <div className="mt-4 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to see example match →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked <span className="text-green-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know about FaceResembler</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-green-100 overflow-hidden transition-all duration-300 hover:shadow-lg group"
              >
                <details className="group">
                  <summary className="list-none cursor-pointer p-6 flex justify-between items-center hover:bg-green-50 transition-colors duration-300">
                    <span className="font-semibold text-gray-800 group-open:text-green-600 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <svg className="h-5 w-5 text-gray-400 group-open:text-green-500 group-open:rotate-180 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-600 animate-fade-in">
                    <div className="pt-4 border-t border-green-50">
                      {faq.answer}
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-green-50 to-green-50 rounded-2xl border border-green-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to find your match?</h3>
            <p className="text-gray-600 mb-6">Upload your photo now and discover your Bollywood lookalike!</p>
            <div className="flex justify-center">
              <FileUpload 
                onUpload={handleUpload} 
                disabled={loading}
                className="transform hover:scale-105 transition-transform duration-300"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats data
const celebrityStats = [
  { value: "10K+", label: "Matches Made" },
  { value: "50+", label: "Bollywood Stars" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "24/7", label: "Available" }
];

// FAQ data
const faqs = [
  {
    question: "How accurate is the face matching?",
    answer: "Our AI model achieves 98% accuracy by analyzing 128 facial landmarks. However, results may vary based on image quality and lighting conditions."
  },
  {
    question: "What type of photos work best?",
    answer: "Clear, front-facing photos with good lighting and no filters work best. Avoid sunglasses, hats, or anything covering your face."
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We process images temporarily and don't store them permanently. Your privacy is our top priority."
  },
  {
    question: "Can I try multiple photos?",
    answer: "Absolutely! Try different angles and expressions to see how your match changes. Some photos might highlight different features."
  }
];