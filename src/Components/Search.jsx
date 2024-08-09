import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import MovieElement from "./MovieElement";

function Search({
  handleSelectedMovies,
  movieAdded,
  suggestions,
  fetchSuggestions,
  query,
  handleInputChange,
  loading,
  handleDeleteMovies,
  selectedMovies,
  selectedMoviesLength,
}) {
  const style = {
    backgroundImage:
      "linear-gradient(to right, rgba(0, 123, 255, 0.1), rgba(94, 234, 212, 0.1))",
  };

  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: "red",
      borderRadius: "4px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <div className="w-[450px] max-h-[450px]">
      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type a movie name..."
          style={style}
          className="bg-transparent border-2 border-white w-[350px] h-[45px] md:w-[450px] md:h-[50px] px-4 rounded-t-md text-white focus:outline-none "
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : suggestions.length > 0 ? (
        <div
          style={style}
          className="custom-scrollbar p-4 border-b-2 border-l-2 border-r-2 rounded-b-xl border-white overflow-auto max-h-[333px]"
        >
          {suggestions.map((movie) => (
            <MovieElement
              key={movie?.id}
              className="text-white"
              title={movie.title}
              id={movie.id}
              poster={movie.poster_path}
              release_date={movie.release_date}
              isInSelected={movie.isInSelected}
              handleSelectedMovies={handleSelectedMovies}
              movieList={false}
              movieAdded={movieAdded}
              handleDeleteMovies={handleDeleteMovies}
              selectedMoviesLength={selectedMoviesLength}
            ></MovieElement>

            // Adjust based on your movie object structure
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Search;
