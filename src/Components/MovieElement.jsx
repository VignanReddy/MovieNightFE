import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { LiaRandomSolid } from "react-icons/lia";
import { FiCheck } from "react-icons/fi";

function MovieElement({
  id,
  poster,
  title,
  release_date,
  isInSelected,
  handleSelectedMovies,
  movieList,
  handleDeleteMovies,
  selectedMoviesLength,
  random,
}) {
  const year = release_date?.split("-")[0];

  const [isSelected, setIsSelected] = useState(false);

  const handleSelected = () => {
    if (selectedMoviesLength < 5) {
      setIsSelected(true);
      handleSelectedMovies(id, poster, title, release_date);
    }
  };

  let truncatedTitleSearch =
    title.length > 32 ? title.substring(0, 32) + "..." : title;

  let truncatedTitleList =
    title.length > 25 ? title.substring(0, 25) + "..." : title;

  if (year) {
    truncatedTitleSearch = truncatedTitleSearch + " (" + year + ")";
    truncatedTitleList = truncatedTitleList + " (" + year + ")";
  }

  return (
    <div className="flex items-center h-14 ">
      <div className="h-11 w-11 flex">
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />
      </div>
      <div className="text-white pl-1 flex-grow">
        <div className="text-md">
          {!movieList ? (
            <div>{truncatedTitleSearch} </div>
          ) : (
            <div>
              <div>{truncatedTitleList}</div>
              <div>
                {random ? (
                  <div className=" text-sm w-[50px] rounded-md">
                    <LiaRandomSolid />
                  </div>
                ) : (
                  <div className="text-sm">
                    <FiCheck className="" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        {!movieList ? (
          isInSelected ? (
            <TiTick
              className="text-white text-2xl hover:cursor-pointer"
              onClick={() => handleDeleteMovies(id)}
            />
          ) : (
            <IoAddCircleOutline
              className={`text-white text-2xl ${
                selectedMoviesLength >= 5
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
              strokeWidth="2"
              onClick={handleSelected}
            />
          )
        ) : (
          <MdDelete
            className="text-white text-2xl hover:cursor-pointer"
            onClick={() => handleDeleteMovies(id)}
          />
        )}
      </div>
    </div>
  );
}

export default MovieElement;
