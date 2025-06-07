
import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information Collection</h2>
            <p className="text-gray-600 mb-4">
              When you use our face matching service, we temporarily process your uploaded image to generate facial recognition results. We do not permanently store your images after processing is complete.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Uploaded images are deleted immediately after processing</li>
              <li>We store only the matching results, not the original images</li>
              <li>No facial recognition data is shared with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Data Usage</h2>
            <p className="text-gray-600">
              Your data is used solely for the purpose of providing the face matching service. We use industry-standard encryption for all data transmissions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to request deletion of any stored matching results associated with your account.
            </p>
          </section>

          <section className="bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-2">
              For any privacy-related questions, please contact our Data Protection Officer at:
            </p>
            <Link to="/contact" className="text-indigo-600 hover:underline">
              privacy@bollywoodmatcher.com
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}