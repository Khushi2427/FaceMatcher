import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';

// Lazy load components with error boundaries
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ContactUs = lazy(() => import('./components/ContactUs'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-red-700">Component Failed to Load</h3>
            <p className="text-red-600">
              {this.state.error.message || 'Please try again or contact support'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-xl md:text-2xl font-bold">Bollywood Face Matcher</h1>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-indigo-200 transition px-3 py-2 rounded-md">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-indigo-200 transition px-3 py-2 rounded-md">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-indigo-200 transition px-3 py-2 rounded-md">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2">
              <ul className="flex flex-col space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="block hover:text-indigo-200 hover:bg-indigo-600 transition px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gallery" 
                    className="block hover:text-indigo-200 hover:bg-indigo-600 transition px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="block hover:text-indigo-200 hover:bg-indigo-600 transition px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <About />
              </>
            } />
            <Route path="/gallery" element={<Gallery />} />
            
            {/* Protected routes with error boundaries */}
            <Route path="/privacy" element={
              <ErrorBoundary>
                <PrivacyPolicy />
              </ErrorBoundary>
            } />
            <Route path="/terms" element={
              <ErrorBoundary>
                <TermsOfService />
              </ErrorBoundary>
            } />
            <Route path="/contact" element={
              <ErrorBoundary>
                <ContactUs />
              </ErrorBoundary>
            } />
          </Routes>
        </Suspense>
      </main>

      {/* Footer - Improved Responsiveness */}
      <footer className="bg-indigo-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base">
                © {new Date().getFullYear()} Bollywood Face Matcher. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/privacy" 
                className="text-sm md:text-base hover:text-indigo-300 transition px-2 py-1"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm md:text-base hover:text-indigo-300 transition px-2 py-1"
              >
                Terms of Service
              </Link>
              <Link 
                to="/contact" 
                className="text-sm md:text-base hover:text-indigo-300 transition px-2 py-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}