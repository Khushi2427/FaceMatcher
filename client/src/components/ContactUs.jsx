import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset the submitted state after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We'd love to hear from you!</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in shadow-sm">
            <div className="flex justify-center mb-4">
              <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Message Sent Successfully!</h2>
            <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 transition-colors duration-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-green-700">Email</h3>
                      <p className="text-gray-600 mt-1">khushigupta16057@gmail.com</p>
                      <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-green-700">Location</h3>
                      <p className="text-gray-600 mt-1">Haryana, India</p>
                      <p className="text-sm text-gray-500 mt-1">Based in the heart of India</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-green-700">Response Time</h3>
                      <p className="text-gray-600 mt-1">24 Hours</p>
                      <p className="text-sm text-gray-500 mt-1">Typically within business hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-green-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                    >
                      <span className="flex items-center justify-center">
                        Send Message
                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-700 mb-2">How long does it take to get a response?</h3>
              <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-700 mb-2">Do you offer technical support?</h3>
              <p className="text-gray-600 text-sm">Yes! We provide technical support for any issues with our face matching service.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-700 mb-2">Can I request a feature?</h3>
              <p className="text-gray-600 text-sm">Absolutely! We welcome feature suggestions and feedback from our users.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-700 mb-2">Is my data secure?</h3>
              <p className="text-gray-600 text-sm">Your privacy is our priority. We don't store uploaded images permanently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}