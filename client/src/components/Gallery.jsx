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

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-indigo-700 mb-4"
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
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {celebrityMatches.map((celebrity) => (
              <motion.div
                key={celebrity.id}
                variants={item}
                layout
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative pb-2/3 h-64">
                  <motion.img 
                    src={celebrity.image} 
                    alt={celebrity.name}
                    className="absolute h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{celebrity.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {celebrity.matches}+ matches
                    </span>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              View More Celebrities
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}