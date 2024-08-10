import { useState } from "react";

function Tooltip({ text, children, style }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {children}
      {isTooltipVisible && (
        <div
          className="absolute w-[102px] transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1"
          style={style} // Directly apply the style object
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
