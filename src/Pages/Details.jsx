import { MdEditCalendar } from "react-icons/md";
import DateTime from "../Components/DateTime";
import { BsListNested } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoTriangleLeft } from "react-icons/go";
import { GoTriangleRight } from "react-icons/go";
import { motion } from "framer-motion";
import GenreDropDown from "../Components/GenreDropDown";
import RatingFilter from "../Components/RatingFilter";
import { RiDeleteBin5Fill } from "react-icons/ri";

import "tailwindcss/tailwind.css";
import Search from "../Components/Search";
import MovieList from "../Components/MovieList";
import Voting from "./Voting";
import { TiTick } from "react-icons/ti";
import StaggeredText from "../Components/StaggeredText";
import { FaRepeat } from "react-icons/fa6";
import { MdOutlineClearAll } from "react-icons/md";
import Tooltip from "../Components/Tooltip";

function Details({
  movieNightName,
  randomMovieIds,
  handlePublish,
  handleVenueChange,
  handleDeleteMovies,
  handleSelectedMovies,
  handleMinutesChange,
  handleHoursChange,
  handleDaysChange,
  selectedMovies,
  venue,
  days,
  hours,
  minutes,
  progress,
  handleProgressClick,
  movieAdded,
  suggestions,
  fetchSuggestions,
  query,
  handleInputChange,
  selectedGenres,
  setSelectedGenres,
  handleGenreClick,
  fetchRandomMovies,
  handleNameChange,
  handleClear,
  handleMovieListClear,
  handleDeleteRandomMovies,
}) {
  const [movies, setMovies] = useState(false);
  const [timer, setTimer] = useState(true);

  const durationProgressStyle =
    Number(days + hours + minutes) > 0 ? "text-[#7ED57B]" : "text-white";
  const venueProgressStyle = venue.length > 1 ? "text-[#7ED57B]" : "text-white";
  const movieNightProgressStyle =
    movieNightName.length > 1 ? "text-[#7ED57B]" : "text-white";
  const movieProgressStyle =
    selectedMovies.length > 1 && selectedMovies.length < 6
      ? "text-[#7ED57B]"
      : "text-white";
  const style = {
    backgroundImage:
      "linear-gradient(to right, rgba(0, 123, 255, 0.2), rgba(94, 234, 212, 0.2))",
  };

  return (
    <div>
      <div className="flex items-centery justify-center text-white text-3xl mt-6 font-bold font-serif">
        Create a Movie Night
      </div>
      <div className="mr-10 ml-10 pt-8 md:flex justify-center relative">
        <div className="">
          <div className="flex mb-6 items-end justify-center md:justify-normal">
            <MdEditCalendar className="text-white text-3xl mr-2 items-end" />
            <div className="text-white text-xl md:text-2xl pl-2 flex">
              <div className="flex items-center mr-4 text-[16px] md:text-xl">
                Name it :
              </div>

              <input
                type="text"
                value={movieNightName}
                onChange={handleNameChange}
                className="bg-transparent pl-2 pb-2   h-[30px] text-gray-300 border-b-2 text-[20px]  rounded-md border-white focus:outline-none focus:ring-0 "
              />
              {/* {movieNightName} */}
            </div>
          </div>
          <div className="md:flex items-center justify-center md:justify-between">
            <div className="flex justify-center gap-x-2 md:gap-x-6">
              <div className="flex items-end">
                <div className="pr-2 flex items-center ">
                  <RxLapTimer className="text-white text-5xl" />
                </div>
              </div>
              <div className="flex-row">
                <div className="text-white pb-2">Days</div>
                <div>
                  <input
                    type="text"
                    className="bg-transparent p-4 md:h-[50px] h-[45px] w-[80px] md:w-[90px] text-white text-[20px] border-2 border-white rounded-md focus:outline-none focus:ring-0 "
                    placeholder=": days"
                    onChange={handleDaysChange}
                    defaultValue={0}
                    value={days}
                  ></input>
                </div>
              </div>
              <div className="flex-row">
                <div className="text-white pb-2">Hours</div>
                <div>
                  <input
                    type="text"
                    className="bg-transparent p-4 md:h-[50px] h-[45px] w-[80px] md:w-[90px] text-white text-[20px] border-2 border-white rounded-md focus:outline-none focus:ring-0 "
                    placeholder=": hrs"
                    defaultValue={0}
                    value={hours}
                    onChange={handleHoursChange}
                  ></input>
                </div>
              </div>
              <div className="flex-row">
                <div className="text-white pb-2">Minutes</div>
                <div>
                  <input
                    type="text"
                    className="bg-transparent p-4 md:h-[50px] h-[45px] w-[80px] md:w-[90px] text-white text-[20px] border-2 border-white rounded-md focus:outline-none focus:ring-0 "
                    placeholder=": mins"
                    defaultValue={5}
                    value={minutes}
                    onChange={handleMinutesChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:mt-4 mt-6">
              <input
                type="text"
                className="bg-transparent p-4 h-[50px] w-[400px] text-white  text-[20px] border-b-2 border-white rounded-md focus:outline-none focus:ring-0 "
                placeholder="Venue"
                value={venue}
                onChange={handleVenueChange}
              ></input>
            </div>
          </div>
          <div className="mt-10 md:flex">
            <div className="flex justify-center">
              <GenreDropDown
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                handleGenreClick={handleGenreClick}
              />
            </div>
            <div className="md:ml-[280px] flex justify-center text-white items-center hover:cursor-pointer mt-4">
              <span className="bg-gray-800 pl-2 pr-2 rounded-md text-xs pt-1 pb-1 md:mr-4">
                {selectedGenres.length} Genres
              </span>
              <div
                className={`mr-4 pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-800  ${
                  selectedMovies.length === 5
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
                onClick={fetchRandomMovies}
              >
                Fill Randomly
              </div>
              <div
                className={`${
                  randomMovieIds.length === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
              >
                <Tooltip
                  text="Delete randoms"
                  style={{ top: "-28px", left: "10px" }}
                >
                  <div
                    className={`${
                      randomMovieIds.length === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:cursor-pointer"
                    }`}
                  >
                    <RiDeleteBin5Fill onClick={handleDeleteRandomMovies} />
                  </div>
                </Tooltip>
              </div>
            </div>
            {/* <div className="md:ml-12 flex justify-center">
            <RatingFilter />
          </div> */}
          </div>

          <div className="relative md:flex mt-6">
            <div className="flex justify-center">
              <Search
                handleSelectedMovies={handleSelectedMovies}
                movieAdded={movieAdded}
                suggestions={suggestions}
                fetchSuggestions={fetchSuggestions}
                query={query}
                handleInputChange={handleInputChange}
                handleDeleteMovies={handleDeleteMovies}
                selectedMoviesLength={selectedMovies.length}
              />
            </div>

            <div className="flex justify-center text-white mt-10 sm:mt-0">
              <MovieList
                selectedMovies={selectedMovies}
                handleDeleteMovies={handleDeleteMovies}
                handleMovieListClear={handleMovieListClear}
              />
            </div>
          </div>
          <div className="flex justify-center mt-12 mb-4">
            <div className="">
              <button
                className="bg-green-500 text-white text-lg font-semibold px-6 py-2 rounded-lg hover:cursor-pointer mr-4"
                onClick={handlePublish}
              >
                publish
              </button>
              <button
                className="bg-gray-500 text-white text-lg font-semibold px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={handleClear}
              >
                clear
              </button>
            </div>
          </div>
        </div>
        <motion.div
          className="fixed top-1/3"
          initial={{ left: "-227px", translateY: "-50%" }}
          animate={{ left: progress ? "0" : "-227px", translateY: "-50%" }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleProgressClick} // Handle click event to toggle progress state
        >
          <div className="h-[220px] w-[230px] border border-white rounded-tr-xl rounded-br-xl bg-[#06123d] flex">
            <div className="flex flex-col gap-y-4 m-4 ">
              <div className="text-white border-b pb-2 border-white">
                Progress
              </div>
              <div className="flex items-center">
                <div>
                  <TiTick className={movieNightProgressStyle} />
                </div>
                <div>
                  <label className={movieNightProgressStyle}>
                    {" "}
                    Name your Movie Night
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <div className="">
                  <TiTick className={durationProgressStyle} />
                </div>
                <div>
                  <label className={durationProgressStyle}>
                    Voting Duration
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <TiTick className={venueProgressStyle} />
                </div>
                <div>
                  <label className={venueProgressStyle}>
                    Give Venue detials
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <TiTick className={movieProgressStyle} />
                </div>
                <div>
                  <label className={movieProgressStyle}>
                    Choose 1 to 5 movies
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            {!progress ? (
              <GoTriangleRight
                className="text-2xl text-white hover:cursor-pointer"
                onClick={handleProgressClick}
              />
            ) : (
              <GoTriangleLeft
                className="text-2xl text-white hover:cursor-pointer"
                onClick={handleProgressClick}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Details;
