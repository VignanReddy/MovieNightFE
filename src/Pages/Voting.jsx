import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CountDown from "../Components/CountDown";
import MovieCard from "../Components/MovieCard";
import { FaRegCopy } from "react-icons/fa";
import { fetchEventDetails } from "../utils/eventUtils";

function Voting() {
  const { eventId } = useParams();
  const link = `https://movienightfe.onrender.com/vote/${eventId}`;
  const [hasVotingEnded, setHasVotingEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    selectedMovies: [],
    venue: "",
    votingEndTime: null,
    voters: [],
  });
  const [votedMovieId, setVotedMovieId] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});

  // State for managing popup visibility
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Grab the profile from localStorage
  const profile = JSON.parse(localStorage.getItem("profile"));

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const handleWinnerMovie = (movie) => {
    setSelectedMovie(movie);
    setSelectedStatus(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (eventId) {
        try {
          await fetchEventDetails(eventId, setEventDetails, setVotedMovieId);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [eventId, votedMovieId, selectedStatus]);

  useEffect(() => {
    const checkVotingStatus = () => {
      if (eventDetails.votingEndTime) {
        const now = new Date();
        const endTime = new Date(eventDetails.votingEndTime);
        setHasVotingEnded(now > endTime);

        fetchIpAndCheckVote();
      }
    };

    checkVotingStatus();
  }, [eventDetails]);

  const fetchIpAndCheckVote = async () => {
    try {
      const voterRecord = eventDetails.voters.find(
        (voter) => voter.voterId === profile?.email
      );

      if (voterRecord) {
        setVotedMovieId(voterRecord.movieId);
      }
    } catch (error) {
      console.error("Failed to fetch IP address or check vote:", error);
    }
  };

  const handleVote = async (movieId) => {
    if (!profile) {
      triggerLoginPopup();
      return;
    }
    if (votedMovieId) return;

    try {
      await axios.put(
        `https://movienight-bz35.onrender.com/events/${eventId}/upvote`,
        {
          movieId: movieId,
          ipAddress: profile.email,
        }
      );

      setVotedMovieId(movieId);
    } catch (error) {
      console.error("Error upvoting movie:", error);
    }
  };

  const triggerLoginPopup = () => {
    setShowLoginPopup(true);
    setTimeout(() => {
      setShowLoginPopup(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link).catch((err) => {
      console.error("Failed to copy:", err);
    });
  };

  return (
    <div>
      <div className="text-white ml-20 mr-20 flex justify-center text-xl mt-6 md:text-4xl md:mt-24 md:mb-12">
        <div className="mr-2"></div>
        <div>
          <div>
            {eventDetails.votingEndTime ? (
              <CountDown
                endTime={eventDetails.votingEndTime}
                eventId={eventId}
                handleWinnerMovie={handleWinnerMovie}
              />
            ) : (
              "Loading..."
            )}
          </div>
          <div className="white mt-4 text-[20px]">
            {!isEmptyObject(selectedMovie) ? (
              <div>Selected Movie : {selectedMovie?.title} </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap md:ml-42 md:mr-42 justify-center m-4">
        {eventDetails.selectedMovies.map((movie) => (
          <div key={movie.movieId} className="m-6">
            <MovieCard
              id={movie.movieId}
              poster={movie.poster}
              title={movie.title}
              release_date={movie.release_date}
              votedMovieId={votedMovieId}
              handleVote={handleVote}
              votes={movie.votes}
              votingDone={selectedStatus}
              selectedMovieId={selectedMovie.movieId}
            />
          </div>
        ))}
      </div>
      <div className=" justify-center mb-8 items-center">
        <div className="flex justify-center text-gray-500 font-serif">
          Share the link with your friends to be voted on:
        </div>

        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <div>
              {/* <div className="text-white pr-4 flex justify-center">
                Generated Link:
              </div> */}
              <a
                href={link}
                className="text-[11px] md:text-xl text-[#38cb91] hover:text-[#42f6af] font-semibold underline transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            </div>
            <div className="pl-2">
              <FaRegCopy
                className="text-white md:text-xl hover:text-2xl"
                onClick={handleCopy}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      {showLoginPopup && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          Please log in to vote
        </div>
      )}
    </div>
  );
}

export default Voting;
