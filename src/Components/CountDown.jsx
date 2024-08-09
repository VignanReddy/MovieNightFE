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
        `http://localhost:4000/events/vote/${eventId}`
      );
      const { selectedMovie } = response.data;
      if (selectedMovie) {
        console.log("entering into setting the stuff");

        setHasSelectedMovie(true);
        // handleWinnerMovie(selectedMovie);
        // setSelectedMovieTitle(selectedMovie.title);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch event details when component mounts
  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  // Function to handle the update request
  const handleUpdate = async () => {
    try {
      console.log("Starting handle update...");
      const response = await axios.put(
        `http://localhost:4000/events/${eventId}/update`
      );
      console.log(response);
      const selectedMovie = response.data.event.selectedMovie;

      // setSelectedMovieTitle(selectedMovie.title);
      // setHasSelectedMovie(true);
      return selectedMovie;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Set countdownCompleted to true when the countdown completes
      if (!countdownCompleted) {
        setCountdownCompleted(true);
        if (!hasSelectedMovie) {
          handleUpdate()
            .then((selectedMovie) => {
              handleWinnerMovie(selectedMovie);
            })
            .catch((error) => {
              console.error("Error in handleUpdate:", error);
            });
        }

        console.log("completed the voting");
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
//
