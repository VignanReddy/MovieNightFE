import Login from "../Components/Login";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieElement from "../Components/MovieElement";

function Home({ handleHomeCreate, homeCreateClicked, profile, userId }) {
  var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoPlay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const [trendingMovies, setTrendingMovies] = useState([]);
  const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          "https://movienight-bz35.onrender.com/api/trending"
        );
        const fetchedMovies = response.data;

        setTrendingMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchMovieDetails();
  }, []);

  return (
    <div class="flex mt-24 justify-center">
      {/* <div class="flex mr-44">
        <Login />
      </div> */}
      <div class="items-center justify-center text-white">
        <div className="ml-4 mr-4">
          <div className="text-[26px] md:text-[33px] pb-6">
            <div className="flex justify-center">
              Streamline movie selection
            </div>
            <div className="flex justify-center">
              Select the best film for the night
            </div>
          </div>
          <div className="justify-center text-[17px] md:text-[20px]">
            <div className="flex justify-center text-gray-400">
              Invite your friends to vote
            </div>
            <div className="flex justify-center text-gray-400">
              and create a memorable Movie Night together.
            </div>
            <div className="flex justify-center mt-8 relative">
              <div>
                <button
                  className="bg-[#2ea374] p-4 mt-6 rounded-2xl flex justify-center "
                  onClick={handleHomeCreate}
                >
                  Create Movie Night
                </button>
              </div>
              {isEmptyObject(profile) && homeCreateClicked && (
                <div className="text-[#888e9b] absolute top-[-12px]">
                  Please Login
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="text-white mt-20 mb-4 ml-10">Trending Movies</div>
          <div className="flex justify-center">
            <div className="md:w-[1300px] w-[370px] p-6 justify-center">
              <Slider {...settings}>
                {trendingMovies.map((movie) => {
                  return (
                    <div className="ml-4">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        className="h-[200px] md:h-[320px] object-contain rounded-xl 
                  "
                      ></img>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
