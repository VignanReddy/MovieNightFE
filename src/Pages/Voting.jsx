import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CountDown from "../Components/CountDown";
import MovieCard from "../Components/MovieCard";
import { FaRegCopy } from "react-icons/fa";
import { fetchEventDetails } from "../utils/eventUtils";
import { machineId, machineIdSync } from "node-machine-id";

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

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const handleWinnerMovie = (movie) => {
    setSelectedMovie(movie);
    console.log(movie);
    setSelectedStatus(true);
    console.log("In handleWinnerMovie", movie);
  };

  useEffect(() => {
    console.log("executing useeffect for fetching details");
    const fetchData = async () => {
      if (eventId) {
        try {
          await fetchEventDetails(eventId, setEventDetails, setVotedMovieId);

          // Additional operations if needed after fetching event details
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
      console.log("executing checkVotingStatus");
      if (eventDetails.votingEndTime) {
        const now = new Date();
        const endTime = new Date(eventDetails.votingEndTime);
        setHasVotingEnded(now > endTime);

        fetchIpAndCheckVote();
      }

      console.log(eventDetails.votingEndTime);
    };

    checkVotingStatus();
  }, [eventDetails]);

  const fetchIpAndCheckVote = async () => {
    console.log("Exectuing the fetchIpAndCheckVote", eventDetails);
    try {
      // const response = await fetch("https://api.ipify.org?format=json");
      // const data = await response.json();
      let data = await machineId();
      setIpAddress(data);

      console.log(data);

      // Check if the IP address has already voted
      const voterRecord = eventDetails.voters.find(
        (voter) => voter.voterId === data
      );

      if (voterRecord) {
        setVotedMovieId(voterRecord.movieId);
      }
    } catch (error) {
      console.error("Failed to fetch IP address or check vote:", error);
    }
  };

  const handleVote = async (movieId) => {
    if (votedMovieId) return; // Prevent voting if already voted

    try {
      await axios.put(
        `https://movienight-bz35.onrender.com/events/${eventId}/upvote`,
        {
          movieId: movieId,
          ipAddress: ipAddress, // Include the IP address in the request body
        }
      );

      setVotedMovieId(movieId);
    } catch (error) {
      console.error("Error upvoting movie:", error);
    }
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
      <div className="md:flex justify-center p-4 items-center">
        <div className="text-white pr-4 flex justify-center">
          Generated Link:
        </div>

        <div className="flex justify-center items-center">
          <div>
            <a
              href={link}
              className="text-sm md:text-xl text-[#38cb91] hover:text-[#42f6af] font-semibold underline transition-colors duration-300"
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
  );
}

export default Voting;
