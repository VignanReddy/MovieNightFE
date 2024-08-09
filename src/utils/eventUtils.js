import axios from "axios";

export const fetchEventDetails = async (id, setEventDetails) => {
  console.log("Executing the fetchEventDetails");
  try {
    const response = await axios.get(
      `https://movienight-bz35.onrender.com/events/vote/${id}`
    );
    const event = response.data;
    const fetchedEventDetails = {
      selectedMovies: event.movies,
      venue: event.venue,
      votingEndTime: event.votingEndTime,
      voters: event.voters,
    };

    // Update state with event details
    setEventDetails(fetchedEventDetails);

    console.log("Fetched event details:", fetchedEventDetails);
  } catch (error) {
    console.error("Error fetching event details:", error);
    // Return a rejected promise to indicate failure
    return Promise.reject(error);
  }
};

export const deleteRandomMovies = (
  randomMovieIds,
  selectedMovies,
  setSelectedMovies,
  selectedMovieIds,
  setSelectedMovieIds,
  setRandomMovieIds
) => {
  const newSelectedMovies = selectedMovies.filter(
    (movie) => !randomMovieIds.includes(movie.id)
  );
  const newSelectedMovieIds = selectedMovieIds.filter(
    (id) => !randomMovieIds.includes(id)
  );

  setSelectedMovies(newSelectedMovies);
  setSelectedMovieIds(newSelectedMovieIds);
  setRandomMovieIds([]);

  // Clear the randomMovieIds as they have been removed
};

export const fetchSuggestions = async (
  searchQuery,
  selectedGenres,
  selectedMovieIds,
  setSuggestions,
  setLoading
) => {
  setLoading(true);
  try {
    console.log(selectedGenres);
    let url = `https://movienight-bz35.onrender.com/api/search-movies?query=${searchQuery}&genres=${selectedGenres}`;
    console.log(url);
    const response = await fetch(
      `https://movienight-bz35.onrender.com/api/search-movies?query=${searchQuery}&genres=${selectedGenres}`
    );

    const data = await response.json();

    const updatedData = data
      .filter((movie) => movie.poster_path !== null)
      .map((movie) => ({
        ...movie,
        isInSelected: selectedMovieIds.includes(movie.id),
      }));

    setSuggestions(updatedData || []);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  } finally {
    setLoading(false);
  }
};

export const handlePublish = async (
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
) => {
  if (
    Number(days + hours + minutes) > 0 &&
    venue.length > 1 &&
    selectedMovies.length > 1 &&
    selectedMovies.length < 6 &&
    movieNightName.length > 1
  ) {
    let date = new Date();

    date.setHours(date.getHours() + Number(hours));
    date.setDate(date.getDate() + Number(days));
    date.setMinutes(date.getMinutes() + Number(minutes));

    const eventData = {
      night: movieNightName,
      venue: venue,
      author: userId,
      days: days,
      hours: hours,
      minutes: minutes,
      votingEndTime: date.toString(),
      movies: selectedMovies.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster,
        release_date: movie.release_date,
        votes: 0,
      })),
      selectedMovie: "",
    };

    try {
      const response = await axios.post(
        "https://movienight-bz35.onrender.com/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newEventId = response.data.eventId;
      setEventId(newEventId);

      navigate(`/vote/${newEventId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    setProgress(true);
  }
};

export const handleDeleteMovies = (
  id,
  selectedMovieIds,
  setSelectedMovieIds,
  selectedMovies,
  setSelectedMovies,
  setRandomMovieIds,
  randomMovieIds
) => {
  setSelectedMovieIds(selectedMovieIds.filter((movieId) => movieId !== id));
  setRandomMovieIds(randomMovieIds.filter((movieId) => movieId !== id));
  setSelectedMovies(selectedMovies.filter((movie) => movie.id !== id));
};

export const handleSelectedMovies = (
  id,
  poster,
  title,
  release_date,
  selectedMovies,
  setSelectedMovies,
  selectedMovieIds,
  setSelectedMovieIds,
  setMovieAdded
) => {
  setSelectedMovieIds((prevSelectedMovieIds) => [...prevSelectedMovieIds, id]);

  setSelectedMovies([
    ...selectedMovies,
    { id: id, poster: poster, title: title, release_date: release_date },
  ]);
  setMovieAdded(true);
};

export const addMoviesToState = (
  movies,
  selectedMovies,
  setSelectedMovies,
  selectedMovieIds,
  setSelectedMovieIds,
  setMovieAdded,
  setCount,
  setRandomMovieIds,
  randomMovieIds
) => {
  // Create a set of existing movie IDs for quick lookup
  const existingMovieIds = new Set(selectedMovieIds);

  console.log("after deleting entering into adding new");

  //if randomly selected movies are there in the list

  // if (randomMovieIds) {
  //   //delete them from selectedMovies
  //   const newSelectedMovies = selectedMovies.filter(
  //     (movie) => !randomMovieIds.includes(movie.id)
  //   );

  //   //delete them from selectedMovieIds
  //   const newSelectedMovieIds = selectedMovieIds.filter(
  //     (id) => !randomMovieIds.includes(id)
  //   );
  //   //delete them from
  // }

  const newSelectedMovies = [];
  const newSelectedMovieIds = [...selectedMovieIds];
  const newRandomMovieIds = [];

  movies.forEach((movie) => {
    if (!existingMovieIds.has(movie.id)) {
      newSelectedMovies.push({
        id: movie.id,
        poster: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
        random: true,
      });
      newSelectedMovieIds.push(movie.id);
      newRandomMovieIds.push(movie.id);
    }
  });

  // Update state with all new movies at once
  setSelectedMovies((prevMovies) => [...prevMovies, ...newSelectedMovies]);
  setSelectedMovieIds(newSelectedMovieIds);
  setRandomMovieIds(newRandomMovieIds);
  setMovieAdded(true);
};

// src/utils/eventUtils.js

export const handleProgressClick = (progress, setProgress) => {
  setProgress(!progress);
};

export const handleInputChange = (e, setMovieNightName) => {
  setMovieNightName(e.target.value);
};

export const handleVenueChange = (event, setVenue) => {
  setVenue(event.target.value);
};

export const handleMinutesChange = (event, setMinutes) => {
  setMinutes(event.target.value);
};

export const handleHoursChange = (event, setHours) => {
  setHours(event.target.value);
};

export const handleDaysChange = (event, setDays) => {
  setDays(event.target.value);
};

export const handleInputChangeOfAuto = (e, setQuery) => {
  const value = e.target.value;
  setQuery(value);
};
