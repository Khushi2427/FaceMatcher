import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="w-full py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-700 mb-2">Terms of Service</h1>
          <p className="text-lg text-gray-600">Effective Date: {new Date().toLocaleDateString()}</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            Last Updated: Today
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold">1</span>
              </div>
              <h2 className="text-2xl font-semibold text-green-700">Acceptance of Terms</h2>
            </div>
            <p className="text-gray-600 pl-11">
              By accessing and using Bollywood Face Matcher, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please discontinue use of our service immediately.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold">2</span>
              </div>
              <h2 className="text-2xl font-semibold text-green-700">Service Description</h2>
            </div>
            <p className="text-gray-600 pl-11">
              Bollywood Face Matcher is an entertainment service that uses facial recognition technology to compare your facial features with those of Bollywood celebrities. All results are generated for entertainment purposes only and should not be taken as professional advice or definitive statements about physical appearance.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold">3</span>
              </div>
              <h2 className="text-2xl font-semibold text-green-700">User Responsibilities</h2>
            </div>
            <div className="pl-11">
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>You must own the rights to or have permission to upload any images submitted to our service</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Do not upload images of others without their explicit consent</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Service is intended for users 13 years or older. Users under 13 must have parental consent</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Maintain respectful and appropriate use of our service at all times</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold">4</span>
              </div>
              <h2 className="text-2xl font-semibold text-green-700">Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 pl-11">
              Bollywood Face Matcher provides this service "as is" without any warranties. We are not responsible for any decisions made based on the results of our service. The facial recognition technology provides approximate matches for entertainment purposes only and should not be considered as professional advice.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold">5</span>
              </div>
              <h2 className="text-2xl font-semibold text-green-700">Intellectual Property</h2>
            </div>
            <p className="text-gray-600 pl-11">
              All celebrity images and related content are used for comparison purposes under fair use. The Bollywood Face Matcher technology, website, and associated content are protected by intellectual property laws. Users retain rights to their uploaded images.
            </p>
          </section>

          <section className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-green-700">Need Assistance?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service or our practices, please don't hesitate to reach out to us.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-green-700 font-medium">
                  Email: <Link to="/contact" className="hover:underline hover:text-green-800">khushigupta16057@gmail.com</Link>
                </span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-700 font-medium">Response Time: Within 24 hours</span>
              </div>
            </div>
            <div className="mt-6">
              <Link 
                to="/contact" 
                className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </Link>
            </div>
          </section>

          {/* Agreement Section */}
          <div className="mt-8 p-4 bg-white border border-green-200 rounded-lg text-center">
            <p className="text-sm text-gray-600">
              By continuing to use Bollywood Face Matcher, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <div className="mt-3 flex items-center justify-center text-green-600">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Terms Acknowledged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}