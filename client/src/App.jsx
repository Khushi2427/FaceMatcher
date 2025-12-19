import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
        <div className="p-8 text-center animate-fade-in">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-700 mb-2">Component Failed to Load</h3>
            <p className="text-red-600 mb-4">
              {this.state.error.message || 'Please try again or contact support'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Retry Loading
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-4 border-green-200"></div>
      <div className="h-16 w-16 rounded-full border-4 border-green-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
    <p className="mt-4 text-green-600 font-medium">Loading content...</p>
    <div className="mt-2 flex space-x-1">
      <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

// Simple Navigation Item Component
const NavItem = ({ to, children, onClick, isActive }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg transition-all duration-300 text-base font-medium
      ${isActive 
        ? 'text-green-700 bg-green-100 shadow-sm' 
        : 'text-green-600 hover:text-green-700 hover:bg-green-50'
      }
    `}
  >
    {children}
  </Link>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Simple Header with Light Green Background */}
      <header className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-green-100/95 backdrop-blur-sm shadow-sm py-2' 
          : 'bg-green-50 py-4'
        }
      `}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Simple Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-green-800">
                  Bollywood Face Matcher
                </h1>
              </div>
            </Link>
            
            {/* Desktop Navigation - Simplified */}
            <nav className="hidden md:block">
              <div className="flex items-center space-x-2">
                <NavItem to="/" isActive={isActive('/')}>
                  Home
                </NavItem>
                <NavItem to="/gallery" isActive={isActive('/gallery')}>
                  Gallery
                </NavItem>
                <NavItem to="/contact" isActive={isActive('/contact')}>
                  Contact
                </NavItem>
              </div>
            </nav>
            
            {/* Simple Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg text-green-600 hover:bg-green-100 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
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
          
          {/* Simple Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 animate-fade-in">
              <div className="bg-green-50 rounded-lg p-2 space-y-1 shadow-sm">
                <NavItem to="/" isActive={isActive('/')} onClick={() => setMobileMenuOpen(false)}>
                  Home
                </NavItem>
                <NavItem to="/gallery" isActive={isActive('/gallery')} onClick={() => setMobileMenuOpen(false)}>
                  Gallery
                </NavItem>
                <NavItem to="/contact" isActive={isActive('/contact')} onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </NavItem>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Suspense fallback={<LoadingSpinner />}>
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

      {/* Footer with Light Green Theme */}
      <footer className="bg-green-50 text-green-800 py-8 border-t border-green-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-sm md:text-base">
                  © {new Date().getFullYear()} Bollywood Face Matcher. All rights reserved.
                </p>
              </div>
              <div className="mt-1 text-xs text-green-600/70">
                Powered by AI Facial Recognition
              </div>
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/privacy" 
                className="text-sm md:text-base text-green-600 hover:text-green-700 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-green-100"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm md:text-base text-green-600 hover:text-green-700 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-green-100"
              >
                Terms of Service
              </Link>
              <Link 
                to="/contact" 
                className="text-sm md:text-base text-green-600 hover:text-green-700 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-green-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <div className="text-center">
              <p className="text-xs text-green-600/60">
                Made with <span className="text-red-400">❤️</span> for Bollywood fans worldwide
              </p>
              <div className="mt-2 flex justify-center space-x-4">
                <a href="#" className="text-green-600/70 hover:text-green-700 transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-green-600/70 hover:text-green-700 transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-green-600/70 hover:text-green-700 transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}