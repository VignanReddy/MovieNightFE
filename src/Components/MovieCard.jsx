import { BiUpvote, BiSolidUpvote } from "react-icons/bi";

function MovieCard({
  id,
  poster,
  title,
  release_date,
  votedMovieId,
  handleVote,
  votes,
  votingDone,
  selectedMovieId,
}) {
  const year = release_date.split("-")[0];
  const style = {
    backgroundImage: votingDone
      ? "linear-gradient(to left, rgba(200, 200, 200, 0.1), rgba(150, 150, 150, 0.2))"
      : "linear-gradient(to left, rgba(0, 220, 137, 0.1), rgba(6, 22, 32, 0.2))",
    border: selectedMovieId === id ? "2px solid gold" : "none",
  };

  const isVotingDisabled = votingDone || (votedMovieId && votedMovieId !== id);

  return (
    <div>
      <div style={style} className="rounded-2xl">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            className="h-[220px] md:h-[300px] object-contain rounded-xl"
            alt={title}
          />
        </div>
        <div className="pl-3 pr-3 pb-2 pt-2 text-sm">
          <div className="flex justify-between text-gray-400 pt-2 items-center">
            <div className="md:w-32 w-20 text-ellipsis truncate">{title}</div>
            <div>({year})</div>
          </div>
          <div className="flex justify-between mt-1">
            <div className="text-gray-400">Votes: {votes}</div>
            <div
              className={`rounded-md transition-transform duration-300 ${
                isVotingDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={isVotingDisabled ? null : () => handleVote(id)}
            >
              {votedMovieId === id ? (
                <BiSolidUpvote className="text-xl text-green-500 cursor-not-allowed" />
              ) : (
                <BiUpvote className="text-xl text-gray-200 hover:text-gray-400 transform hover:scale-105" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
