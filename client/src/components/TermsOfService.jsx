import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By using Bollywood Face Matcher, you agree to these Terms of Service and our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
            <p className="text-gray-600">
              Our service provides entertainment by comparing facial features with Bollywood celebrities. Results are for entertainment purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You must own or have rights to upload any images</li>
              <li>Do not upload images of others without their consent</li>
              <li>Service is intended for users 13 years or older</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600">
              Bollywood Face Matcher is not responsible for any decisions made based on the results of our service.
            </p>
          </section>

          <section className="bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Questions?</h2>
            <p className="text-gray-600">
              Contact us at <Link to="/contact" className="text-indigo-600 hover:underline">khushigupta16057@gmail.com</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}