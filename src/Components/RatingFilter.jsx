import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { FaImdb } from "react-icons/fa";

function RatingFilter() {
  const [rating, setRating] = useState(0);

  const handleChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
    <div className="flex items-center space-x-4 h-12">
      <FaImdb className="text-yellow-500 text-3xl" />
      <Box className="mt-2" sx={{ width: 347 }}>
        <Slider
          size="medium"
          defaultValue={0}
          aria-label="Small"
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.1}
          value={rating}
          onChange={handleChange}
        />
      </Box>
      <div className="text-white">
        <span>{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default RatingFilter;
