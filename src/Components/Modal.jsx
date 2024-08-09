import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  // Define modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: "-20px" }, // Start from 20px above
    visible: { opacity: 1, y: "20px" }, // Final position 20px from the top
  };

  return (
    <div
      className="fixed inset-0 flex items-start justify-center z-50 text-white"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Slightly darker background
        backdropFilter: "blur(2px)", // Apply blur effect
      }}
      onClick={onClose}
    >
      <motion.div
        className="p-6 rounded-md shadow-md bg-[#051937] w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3, ease: "easeOut" }} // Smoother transition
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
        style={{ marginTop: "20px" }} // Ensure modal starts 20px from top
      >
        <h2 className="text-xl mb-4">Confirm Publish</h2>
        <p>
          Details can't be changed after publishing. Are you sure you want to
          proceed?
        </p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
