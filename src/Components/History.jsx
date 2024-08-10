import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiMovieFill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaCalendar } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdWorkHistory } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { MdCreateNewFolder } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th"; // Handles 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const parts = date.toLocaleDateString("en-US", options).split(" ");

  const day = parseInt(parts[1], 10);
  const ordinalSuffix = getOrdinalSuffix(day);
  return `${parts[0]} ${day}${ordinalSuffix} ${parts[2]}`;
}

function truncateTitle(title, maxLength) {
  if (title && title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}

const History = ({ profile }) => {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [eventsByUser, setEventsByUser] = useState([]);

  const getHistory = async (userId) => {
    try {
      const response = await axios.get(
        `https://movienight-bz35.onrender.com/events/user/${userId}`
      );
      setEventsByUser(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `https://movienight-bz35.onrender.com/events/${eventId}`
      );
      setEventsByUser(eventsByUser.filter((event) => event._id !== eventId));

      // Set the delete message
      setDeleteMessage("Event deleted successfully");

      // Clear the delete message after 1 second
      setTimeout(() => {
        setDeleteMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    const profileString = localStorage.getItem("profile");
    if (profileString) {
      const profile = JSON.parse(profileString);
      const userId = profile.userId;

      // You can now use userId as needed, for example:
      getHistory(userId);
    } else {
      console.warn("No profile found in local storage");
    }
  }, []);

  const style = {
    backgroundImage:
      "linear-gradient(to right, rgba(0, 123, 255, 0.1), rgba(94, 234, 212, 0.1))",
  };

  const getStatus = (votingEndTime) => {
    const currentTime = new Date();
    const endTime = new Date(votingEndTime);
    return currentTime < endTime ? "Running" : "Finished";
  };

  return (
    <div className="text-white md:ml-[350px] md:mr-[350px] pt-12 relative">
      {deleteMessage && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 mb-4 bg-green-900 bg-opacity-20 text-gray-400 rounded-lg pl-2 pr-2 pt-1 pb-1 shadow-xl backdrop-blur-lg">
          {deleteMessage}
        </div>
      )}
      <h1 className="text-md md:text-2xl flex justify-center mb-10 items-center ">
        <span className="mr-2">
          <MdCreateNewFolder className="text-3xl" />
        </span>
        <span className="font-mono">Created Events</span>
      </h1>
      <div className="flex justify-normal ml-10 mr-10 mb-6 md:text-base text-[10px]">
        <div className="w-[240px] flex justify-normal items-center">
          {" "}
          <span className="pr-2">
            <RiMovieFill className="" />
          </span>
          <span>Event</span>
        </div>
        <div className="w-[240px] flex justify-center items-center">
          <span className="pr-2">
            <FaCalendar className="" />
          </span>
          <span>Date</span>
        </div>

        <div className="w-[240px] flex justify-center items-center">
          {" "}
          <span className="pr-2">
            <GrInProgress className="" />
          </span>
          <span>Status</span>
        </div>

        <div className="w-[240px] flex justify-center items-center">
          <span className="pr-2">
            <FiDelete className="" />
          </span>
          <span>Delete</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl" style={style}>
        {eventsByUser.length == 0 ? (
          <div className="w-full h-[650px] flex justify-center items-center text-2xl font-xs">
            {" "}
            No Movie Night Events Created
          </div>
        ) : null}
        {eventsByUser.map((event) => (
          <div
            key={event._id}
            className="flex pb-6 pt-6 border-b border-gray-500 ml-10 mr-10 text-[10px] md:text-[15px]"
          >
            <div className=" font-semibold w-[240px] flex justify-normal items-center">
              <a
                href={`http://localhost:3000/vote/${event._id}`}
                target="_blank"
                className="underline"
              >
                {event.night}
              </a>
              <FaExternalLinkAlt className="ml-2 text-xs text-gray-300" />
            </div>
            <div className="w-[240px] flex justify-center">
              {formatDate(new Date(event.createdAt))}
            </div>

            <div className="w-[240px] flex justify-center">
              {getStatus(event.votingEndTime)}
            </div>
            <div className="w-[240px] flex justify-center ">
              <AiTwotoneDelete
                className="cursor-pointer"
                onClick={() => deleteEvent(event._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
