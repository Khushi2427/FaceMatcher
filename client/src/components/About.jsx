import React from "react";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

export default function About() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      {/* <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-20 bg-gradient-to-r from-green-400 to-green-300 text-white"
      >
        {/* <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-bold mb-6"
          >
            Discover Your Bollywood Twin
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl max-w-3xl mx-auto"
          >
            Our advanced AI technology matches your facial features with thousands of Bollywood celebrities
          </motion.p>
        </div> */}
      {/* </motion.div> */} 

      {/* Technology Overview */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-green-600 mb-4">
              Our Technology
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge facial recognition and machine learning algorithms
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "128-Point Facial Analysis",
                desc: "We analyze 128 distinct facial landmarks to create your unique facial fingerprint for precise matching."
              },
              {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "Privacy First Approach",
                desc: "Your photos are processed in memory and never stored. We automatically delete all uploads after analysis."
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "10,000+ Celebrity Database",
                desc: "Our comprehensive database includes actors from classic to contemporary Bollywood cinema."
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-green-100"
              >
                <div className="text-green-600 mb-6">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tech.icon} />
                  </motion.svg>
                </div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">{tech.title}</h3>
                <p className="text-gray-600">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-green-50 p-12 rounded-2xl border border-green-100"
          >
            <motion.h3 variants={itemVariants} className="text-3xl font-bold text-green-600 mb-8 text-center">
              How It Works
            </motion.h3>
            <motion.div 
              variants={containerVariants}
              className="grid md:grid-cols-4 gap-6"
            >
              {[
                {number: 1, title: "Upload Photo", desc: "Submit a clear frontal photo of your face"},
                {number: 2, title: "AI Analysis", desc: "Our system maps 128 facial features"},
                {number: 3, title: "Database Match", desc: "Compare with 10,000+ celebrity profiles"},
                {number: 4, title: "Get Results", desc: "Receive your top matches with similarity scores"}
              ].map((step) => (
                <motion.div 
                  key={step.number}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-semibold text-green-700 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Team/Company Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-16 bg-green-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">About Our Developer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our developer is an AI and Bollywood enthusiast with a passion for technology and cinema.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {name: "Khushi", role: "Data Scientist and Web Developer", bio: "Enthusiast in AI and Web Development"},
              {name: "Parul Gupta", role: "Bollywood Expert", bio: "Film historian and celebrity data curator"}
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-lg shadow-md text-center border border-green-100"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-green-600 text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-green-700">{member.name}</h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 bg-green-300 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
            Ready to Find Your Bollywood Match?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-8">
            Upload your photo now and discover which celebrity you resemble
          </motion.p>
          <motion.a 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/" 
            className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition duration-300 shadow-md hover:shadow-lg"
          >
            Try It Now
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}