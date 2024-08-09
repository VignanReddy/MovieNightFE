import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const Create = ({ movieNightName, handleInputChange, handleCreateClick }) => {
  return (
    <div className="flex flex-col items-center flex-grow mt-40">
      <div className="flex items-center mb-6">
        <AiOutlineCalendar className="text-white text-5xl" />
        <h1 className="text-white text-2xl md:text-4xl font-bold">
          Create a Movie Night
        </h1>
      </div>
      <input
        type="text"
        placeholder="Name IT..."
        value={movieNightName}
        onChange={handleInputChange}
        className="border border-green-500 rounded-xl px-4 py-2 mb-8 h-14 w-[250px] md:w-[450px] text-white bg-transparent"
      />
      <button
        onClick={handleCreateClick}
        className="bg-green-500 text-white text-lg font-semibold px-6 py-2 rounded-lg"
      >
        create
      </button>
    </div>
  );
};

export default Create;
