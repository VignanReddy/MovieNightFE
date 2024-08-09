// StaggeredText.js
import { motion } from "framer-motion";
import React from "react";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const StaggeredText = ({ text }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        show: {
          transition: {
            staggerChildren: 0.1, // Adjust the delay between text elements
          },
        },
      }}
      className="flex flex-wrap"
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={textVariants}
          className="mr-2" // Tailwind CSS for spacing between words
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggeredText;
