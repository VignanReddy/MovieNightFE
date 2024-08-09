import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function GenreDropDown({
  selectedGenres,
  setSelectedGenres,
  handleGenreClick,
}) {
  const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    SciFi: 878,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };

  const genreEntries = Object.entries(genres);
  const style = {
    backgroundImage:
      "linear-gradient(to right, rgba(7, 36, 76, 1), rgba(13, 46, 72, 1))",
  };

  const halfIndex = Math.ceil(genreEntries.length / 2);
  const firstHalf = genreEntries.slice(0, halfIndex);
  const secondHalf = genreEntries.slice(halfIndex);
  const [toggleGenres, setToggleGenres] = useState(false);

  return (
    <div className="relative w-72">
      <div
        className="w-72 h-10 rounded-md text-white flex pl-4 pr-4 justify-between items-center text-sm cursor-pointer"
        onClick={() => setToggleGenres(!toggleGenres)}
        style={style}
      >
        <div>Genres</div>
        <div>{toggleGenres ? <FaAngleUp /> : <FaAngleDown />}</div>
      </div>
      {toggleGenres ? (
        <div
          className="absolute top-12 left-0 z-10 text-white border rounded shadow-lg p-4 w-full"
          style={style}
        >
          <div className="flex flex-wrap">
            {/* First column */}
            <ul className="w-1/2 pr-2">
              {firstHalf.map(([name, id]) => (
                <li
                  key={id}
                  className={`flex items-center space-x-2 mb-2 rounded cursor-pointer transition-transform duration-200 transform ${
                    selectedGenres.includes(id)
                      ? "text-green-400"
                      : "text-white"
                  } hover:scale-105`}
                  onClick={() => handleGenreClick(id)}
                >
                  <TiTick
                    className={`transition-transform duration-200 ${
                      selectedGenres.includes(id)
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  />
                  <span
                    className={`transition-transform duration-200 ${
                      selectedGenres.includes(id)
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {name}
                  </span>
                </li>
              ))}
            </ul>
            {/* Second column */}
            <ul className="w-1/2 pl-2">
              {secondHalf.map(([name, id]) => (
                <li
                  key={id}
                  className={`flex items-center space-x-2 mb-2 rounded cursor-pointer transition-transform duration-200 transform ${
                    selectedGenres.includes(id)
                      ? "text-green-400"
                      : "text-white"
                  } hover:scale-105`}
                  onClick={() => handleGenreClick(id)}
                >
                  <TiTick
                    className={`transition-transform duration-200 ${
                      selectedGenres.includes(id)
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  />
                  <span
                    className={`transition-transform duration-200 ${
                      selectedGenres.includes(id)
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GenreDropDown;
