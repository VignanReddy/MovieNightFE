import React, { useState, useEffect } from "react";
import { FaHistory } from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const style = {
  backgroundColor: "rgba(5, 18, 61,0.4)",
};

const Header = ({
  handleLoginSuccess,
  handleLoginFailure,
  profile,
  historyClick,
  setHistoryClick,
  handleHistoryClick,
  setUserId,
  setProfile,
  handleHomeNavigation,
}) => {
  const profileString = localStorage.getItem("profile");

  // Parse the JSON string back to a JavaScript object
  const profileLocal = profileString ? JSON.parse(profileString) : {};

  const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0;
  };

  const [loginClick, setLoginClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);

  // Determine the current profile
  const currentProfile =
    profile && !isEmptyObject(profile) ? profile : profileLocal;

  useEffect(() => {
    // Update user ID whenever currentProfile changes
    if (currentProfile.userId) {
      setUserId(currentProfile.userId);
    }
  }, [currentProfile, setUserId]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setUserId(null);
    setProfileClick(false);
    setProfile({});
    setLoginClick(false);

    handleHomeNavigation();
  };

  return (
    <div className="relative">
      <div
        className="flex justify-between items-center pl-4 pr-4 pt-2 pb-2"
        style={style}
      >
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={handleHomeNavigation}
        >
          <GiFilmSpool className="text-white text-2xl mr-2" />
          <h1 className="text-white md:text-xl font-semibold">Movie Night</h1>
        </div>
        <div className="flex items-center">
          {!isEmptyObject(currentProfile) && (
            <div
              className="flex items-center hover:cursor-pointer"
              onClick={handleHistoryClick}
            >
              <FaHistory className="text-gray-300 md:text-xl mr-1" />
              <h2 className="text-gray-300 md:text-xl font-semibold">
                History
              </h2>
            </div>
          )}

          {!isEmptyObject(currentProfile) && (
            <div className="text-white ml-2 md:ml-6 md:mr-6">|</div>
          )}

          {isEmptyObject(currentProfile) ? (
            <div
              className="flex justify-center rounded-md items-center p-2 hover:bg-gray-800 hover:text-white hover:cursor-pointer"
              onClick={() => setLoginClick(!loginClick)}
            >
              <div>
                <CgProfile className="text-gray-300 md:text-xl mr-2" />
              </div>
              <div className=" text-gray-300 md:text-xl rounded-md flex items-center justify-center">
                Log in
              </div>
              <div>
                <RiArrowDownSFill className="text-gray-300 text-2xl" />
              </div>
            </div>
          ) : (
            <div
              className="flex"
              onClick={() => setProfileClick(!profileClick)}
            >
              <div className="text-white flex items-center justify-center hover:bg-[#3b3b3b] p-2 rounded-md cursor-pointer">
                <div className="mr-2 flex items-center justify-center w-8 h-8 rounded-full text-xl bg-[#0b3328] text-[#0a8055] font-semibold">
                  {currentProfile?.given_name &&
                    currentProfile?.given_name[0].toLowerCase()}
                </div>
                {/* <div className="font-semibold text-xl flex items-center text-[#d1d5db]">
                  {currentProfile?.given_name}
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {loginClick && isEmptyObject(currentProfile) && (
        <div className="hover:bg-gray-800 cursor-pointer top-20 bottom-0 right-0 absolute bg-gray-700 w-44 h-14 flex justify-center items-center rounded-xl">
          <div className="text-gray-300 mr-2 hover:text-white">
            Sign in with
          </div>
          <div>
            <Login
              handleLoginFailure={handleLoginFailure}
              handleLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
      {profileClick && (
        <div
          className="hover:bg-gray-800 cursor-pointer top-[65px] bottom-0 right-[16px] absolute bg-gray-700 p-6 flex justify-center items-center rounded-xl"
          onClick={handleLogout}
        >
          <div className="text-gray-300 mr-2 hover:text-white">Log out</div>
        </div>
      )}
    </div>
  );
};

export default Header;
