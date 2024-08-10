import { useState } from "react";
import MovieElement from "./MovieElement";
import { MdOutlineClearAll } from "react-icons/md";
import Tooltip from "../Components/Tooltip";

function MovieList({
  selectedMovies,
  handleDeleteMovies,
  handleMovieListClear,
}) {
  const style = {
    backgroundImage:
      "linear-gradient(to right, rgba(0, 123, 255, 0.1), rgba(94, 234, 212, 0.1))",
  };

  return (
    <div
      style={style}
      className="w-96 h-96 md:ml-10 rounded-md p-4 border-2 border-white relative"
    >
      <div className="flex w-full justify-center border-b-2 white pb-2">
        Movie List
      </div>
      {selectedMovies.length === 0 && (
        <div className="flex justify-center items-center absolute inset-0 text-gray-500">
          Empty List
        </div>
      )}
      <div className="pt-2">
        {selectedMovies.map((movie) => {
          return (
            <MovieElement
              key={movie?.id}
              className="text-white"
              title={movie.title}
              id={movie.id}
              poster={movie.poster}
              release_date={movie.release_date}
              movieList={true}
              random={movie?.random}
              handleDeleteMovies={handleDeleteMovies}
            ></MovieElement>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-2">
        <div className="flex jsutify-center items-center">
          <div className="text-sm text-gray-400">
            {selectedMovies.length}/5{" "}
          </div>

          <div className="pl-2 text-xs text-gray-400">movies selected</div>
        </div>
        <div className="ml-2">
          <Tooltip
            text="Clear all Movies"
            style={{ top: "-28px", left: "10px" }}
          >
            <MdOutlineClearAll
              className="text-2xl text-gray-300 hover:text-gray-50 hover:cursor-pointer"
              onClick={handleMovieListClear}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
