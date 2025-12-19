import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const allCelebrityMatches = [
    {
      id: 1,
      name: "Shah Rukh Khan",
      image: "/Bollywood_data/Shah_Rukh_Khan/Shah_Rukh_Khan.90.jpg",
      matches: 42
    },
    {
      id: 2,
      name: "Deepika Padukone",
      image: "/Bollywood_data/Deepika_Padukone/Deepika_Padukone.41.jpg",
      matches: 38
    },
    {
      id: 3,
      name: "Amitabh Bachchan",
      image: "/Bollywood_data/Amitabh_Bachchan/Amitabh_Bachchan.36.jpg",
      matches: 35
    },
    {
      id: 4,
      name: "Priyanka Chopra",
      image: "/Bollywood_data/Priyanka_Chopra/Priyanka_Chopra.24.jpg",
      matches: 31
    },
    {
      id: 5,
      name: "Ranveer Singh",
      image: "/Bollywood_data/Ranveer_Singh/Ranveer_Singh.22.jpg",
      matches: 28
    },
    {
      id: 6,
      name: "Aishwarya Rai",
      image: "/Bollywood_data/Aishwarya_Rai/Aishwarya_Rai.21.jpg",
      matches: 25
    },
    {
      id: 7,
      name: "Anushka Sharma",
      image: "/Bollywood_data/Anushka_Sharma/Anushka_Sharma.16.jpg",
      matches: 25
    },
    {
      id: 8,
      name: "Akshay Kumar",
      image: "/Bollywood_data/Akshay_Kumar/Akshay_Kumar.28.jpg",
      matches: 51
    },
    {
      id: 9,
      name: "Salman Khan",
      image: "/Bollywood_data/Salman_Khan/Salman_Khan.32.jpg",
      matches: 55
    },
    {
      id: 10,
      name: "Katrina Kaif",
      image: "/Bollywood_data/Katrina_Kaif/Katrina_Kaif.25.jpg",
      matches: 31
    },
    {
      id: 11,
      name: "Hrithik Roshan",
      image: "/Bollywood_data/Hrithik_Roshan/Hrithik_Roshan.40.jpg",
      matches: 45
    },
    {
      id: 12,
      name: "Alia Bhatt",
      image: "/Bollywood_data/Alia_Bhatt/Alia_Bhatt.23.jpg",
      matches: 15
    },
    {
      id: 13,
      name: "Kareena Kapoor",
      image: "/Bollywood_data/Kareena_Kapoor/Kareena_Kapoor.46.jpg",
      matches: 33
    },
    {
      id: 14,
      name: "Varun Dhawan",
      image: "/Bollywood_data/Varun_Dhawan/Varun_Dhawan.33.jpg",
      matches: 18
    },
    {
      id: 15,
      name: "Sidharth Malhotra",
      image: "/Bollywood_data/Sidharth_Malhotra/Sidharth_Malhotra.28.jpg",
      matches: 22
    }
  ];

  const [showAll, setShowAll] = useState(false);
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const initialCelebritiesToShow = 9;
  const celebrityMatches = showAll 
    ? allCelebrityMatches 
    : allCelebrityMatches.slice(0, initialCelebritiesToShow);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-green-600 mb-4"
          >
            Celebrity Matches Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Browse through our most common celebrity matches from users around the world
          </motion.p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {allCelebrityMatches.length} Celebrities
            </span>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {celebrityMatches.map((celebrity) => (
              <motion.div
                key={celebrity.id}
                variants={item}
                layout
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:border-green-300 transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setSelectedCelebrity(celebrity)}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    src={celebrity.image} 
                    alt={celebrity.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-sm">Click to view details</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{celebrity.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {celebrity.matches}+ matches
                    </span>
                    <div className="text-green-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && allCelebrityMatches.length > initialCelebritiesToShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
            >
              <span>View More Celebrities</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-green-50 rounded-2xl p-8 border border-green-100"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-700 mb-2">{allCelebrityMatches.length}+</div>
              <div className="text-green-600 font-medium">Bollywood Stars</div>
              <div className="text-sm text-gray-600 mt-1">in our database</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 mb-2">1000+</div>
              <div className="text-green-600 font-medium">Daily Matches</div>
              <div className="text-sm text-gray-600 mt-1">from users worldwide</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 mb-2">98%</div>
              <div className="text-green-600 font-medium">Accuracy Rate</div>
              <div className="text-sm text-gray-600 mt-1">across all matches</div>
            </div>
          </div>
        </motion.div>

        {/* Modal for Celebrity Details */}
        <AnimatePresence>
          {selectedCelebrity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCelebrity(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <img 
                    src={selectedCelebrity.image} 
                    alt={selectedCelebrity.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedCelebrity(null)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-green-700 p-2 rounded-full"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{selectedCelebrity.name}</h3>
                  <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                      {selectedCelebrity.matches}+ successful matches
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    One of the most commonly matched celebrities in our database. Users often match with {selectedCelebrity.name} due to distinctive facial features.
                  </p>
                  <button
                    onClick={() => setSelectedCelebrity(null)}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-colors duration-300"
                  >
                    Close Details
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}