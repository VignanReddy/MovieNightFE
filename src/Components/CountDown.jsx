import React, { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import axios from "axios";

function CountDown({ endTime, eventId, handleWinnerMovie }) {
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [hasSelectedMovie, setHasSelectedMovie] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countdownCompleted, setCountdownCompleted] = useState(false);

  // Function to fetch event details
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `https://movienight-bz35.onrender.com/events/vote/${eventId}`
      );
      const { selectedMovie } = response.data;
      if (selectedMovie) {
        console.log("entering into setting the stuff");
        setHasSelectedMovie(true);
        return selectedMovie;
      } else {
        setHasSelectedMovie(false);
        return null;
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the update request
  const handleUpdate = async () => {
    try {
      console.log("Starting handle update...");
      const response = await axios.put(
        `https://movienight-bz35.onrender.com/events/${eventId}/update`
      );
      console.log(response);
      const selectedMovie = response.data.event.selectedMovie;
      return selectedMovie;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const handleCompletionFlow = async () => {
    const selectedMovie = await fetchEventDetails();
    if (!selectedMovie) {
      const updatedMovie = await handleUpdate();
      handleWinnerMovie(updatedMovie);
    } else {
      handleWinnerMovie(selectedMovie);
    }
    console.log("Completed the voting process.");
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Set countdownCompleted to true when the countdown completes
      if (!countdownCompleted) {
        setCountdownCompleted(true);
        handleCompletionFlow().catch((error) => {
          console.error("Error in handleCompletionFlow:", error);
        });
      }

      // Render a completed state
      return (
        <div>
          <div className="text-gray-300 flex justify-center">Voting Ended</div>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div>
          {days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown
        date={new Date(endTime).getTime()}
        renderer={renderer}
        zeroPadTime={2}
      />
    </div>
  );
}

export default CountDown;
