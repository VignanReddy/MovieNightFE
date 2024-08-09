import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Voting from "./Pages/Voting";
import "../src/index.css";
import Modal from "./Components/Modal";
import { Routes, Route } from "react-router-dom";
import Create from "./Pages/Create";
import Details from "./Pages/Details";
import Home from "./Pages/Home";
import History from "./Components/History";
import axios from "axios";
import {
  fetchSuggestions,
  handlePublish as publishEvent,
  handleDeleteMovies,
  handleSelectedMovies,
  handleProgressClick,
  handleInputChange,
  handleVenueChange,
  handleMinutesChange,
  handleHoursChange,
  handleDaysChange,
  handleInputChangeOfAuto,
  addMoviesToState,
  deleteRandomMovies,
} from "./utils/eventUtils";
import { handleLoginSuccess, handleLoginFailure } from "./utils/userUtils";

function App() {
  const navigate = useNavigate();
  // Event states
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [venue, setVenue] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [eventId, setEventId] = useState("");
  const [progress, setProgress] = useState(false);
  const [movieAdded, setMovieAdded] = useState(false);
  const [movieNightName, setMovieNightName] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovieIds, setSelectedMovieIds] = useState([]);
  const [randomMovieIds, setRandomMovieIds] = useState([]);
  const [historyClick, setHistoryClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  // User states
  const [profile, setProfile] = useState({});
  const [userId, setUserId] = useState(null);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [count, setCount] = useState(0);

  // Other
  const [homeCreateClicked, setHomeCreateClicked] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // const handleHistoryClick = async () => {
  //   getHistory();
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    await publishEvent(
      movieNightName,
      venue,
      userId,
      days,
      hours,
      minutes,
      selectedMovies,
      setEventId,
      navigate,
      setProgress,
      handleClear
    );
  };

  const confirmPublish = () => {
    if (
      Number(days + hours + minutes) > 0 &&
      venue.length > 1 &&
      selectedMovies.length > 1 &&
      selectedMovies.length < 6 &&
      movieNightName.length > 1
    ) {
      setIsModalOpen(true);
    } else {
      setProgress(!progress);
    }
  };

  const handleDeleteRandomMovies = async () => {
    deleteRandomMovies(
      randomMovieIds,
      selectedMovies,
      setSelectedMovies,
      selectedMovieIds,
      setSelectedMovieIds,
      setRandomMovieIds
    );
  };

  const handleMovieListClear = () => {
    setSelectedMovies([]);
    setSelectedMovieIds([]);
    setRandomMovieIds([]);
  };

  const handleClear = () => {
    setVenue("");
    setMinutes(5);
    setHours(0);
    setDays(0);
    setMovieAdded(false);
    setMovieNightName("");
    setSuggestions([]);
    setQuery("");
    setSelectedMovies([]);
    setSelectedMovieIds([]);
    setRandomMovieIds([]);
    setSelectedGenres([]);
  };

  const fetchRandomMovies = async () => {
    setLoadingRandom(true);
    try {
      // Convert genres array to a comma-separated string
      const genreIds = selectedGenres.join(",");
      const response = await fetch(
        `https://movienight-bz35.onrender.com/api/random?genreIds=${genreIds}&count=${
          5 - selectedMovies.length
        }`
      );

      console.log(5 - selectedMovies.length);

      setCount(5 - selectedMovies.length);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const movies = await response.json();
      addMoviesToState(
        movies,
        selectedMovies,
        setSelectedMovies,
        selectedMovieIds,
        setSelectedMovieIds,
        setMovieAdded,
        setCount,
        setRandomMovieIds,
        randomMovieIds
      );
    } catch (error) {
      console.error("Error fetching random movies:", error.message);
    } finally {
      setLoadingRandom(false);
    }
  };

  const handleGenreClick = (id) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(id)
        ? prevSelectedGenres.filter((genreId) => genreId !== id)
        : [...prevSelectedGenres, id]
    );
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchSuggestions(
      query,
      selectedGenres,
      selectedMovieIds,
      setSuggestions,
      setLoading
    );
  }, [selectedMovieIds, query, selectedGenres]);

  return (
    <div className="App">
      <Header
        handleLoginSuccess={(response) =>
          handleLoginSuccess(response, setLoginSuccess, setUserId, setProfile)
        }
        handleLoginFailure={(error) =>
          handleLoginFailure(error, setLoginSuccess)
        }
        profile={profile}
        setUserId={setUserId}
        historyClick={historyClick}
        setHistoryClick={setHistoryClick}
        handleHistoryClick={() => {
          navigate("/history");
        }}
        setProfile={setProfile}
        handleHomeNavigation={handleHomeNavigation}
      />

      <Routes>
        <Route path="/history" element={<History profile={profile} />} />

        <Route
          path="/"
          element={
            <Home
              handleHomeCreate={() => {
                setHomeCreateClicked(true);
                setTimeout(() => {
                  setHomeCreateClicked(false);
                }, 2000);
                if (userId) {
                  handleClear();
                  navigate("/details");
                }
              }}
              userId={userId}
              profile={profile}
              homeCreateClicked={homeCreateClicked}
            />
          }
        />
        <Route
          path="/details"
          element={
            <Details
              randomMovieIds={randomMovieIds}
              handleMovieListClear={handleMovieListClear}
              handleClear={handleClear}
              movieNightName={movieNightName}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              fetchRandomMovies={fetchRandomMovies}
              handleGenreClick={handleGenreClick}
              handleDeleteRandomMovies={handleDeleteRandomMovies}
              handleNameChange={(e) => handleInputChange(e, setMovieNightName)}
              handlePublish={confirmPublish} // Use confirmPublish here
              handleVenueChange={(e) => handleVenueChange(e, setVenue)}
              handleDeleteMovies={(id) =>
                handleDeleteMovies(
                  id,
                  selectedMovieIds,
                  setSelectedMovieIds,
                  selectedMovies,
                  setSelectedMovies,
                  setRandomMovieIds,
                  randomMovieIds
                )
              }
              handleSelectedMovies={(id, poster, title, release_date) =>
                handleSelectedMovies(
                  id,
                  poster,
                  title,
                  release_date,
                  selectedMovies,
                  setSelectedMovies,
                  selectedMovieIds,
                  setSelectedMovieIds,
                  setMovieAdded
                )
              }
              handleMinutesChange={(e) => handleMinutesChange(e, setMinutes)}
              handleHoursChange={(e) => handleHoursChange(e, setHours)}
              handleDaysChange={(e) => handleDaysChange(e, setDays)}
              selectedMovies={selectedMovies}
              venue={venue}
              minutes={minutes}
              hours={hours}
              days={days}
              userId={userId}
              handleProgressClick={() =>
                handleProgressClick(progress, setProgress)
              }
              progress={progress}
              movieAdded={movieAdded}
              suggestions={suggestions}
              fetchSuggestions={(searchQuery) =>
                fetchSuggestions(
                  searchQuery,
                  selectedMovieIds,
                  selectedGenres,
                  setSuggestions,
                  setLoading
                )
              }
              query={query}
              handleInputChange={(e) =>
                handleInputChangeOfAuto(
                  e,
                  setQuery,
                  fetchSuggestions,
                  selectedMovieIds,
                  setSuggestions,
                  setLoading
                )
              }
            />
          }
        />
        <Route
          path="/create"
          element={
            <Create
              movieNightName={movieNightName}
              handleInputChange={(e) => handleInputChange(e, setMovieNightName)}
              handleCreateClick={() => {
                console.log("Creating movie night with name:", movieNightName);
                navigate("/details");
              }}
            />
          }
        />
        <Route path="/vote/:eventId" element={<Voting />} />
      </Routes>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default App;
