import React from "react";

export default function Tooltip({tooltipFunc, message, className}) {
  return (
    <p
      className={`${
        tooltipFunc ? "block" : "hidden"
      } absolute text-center text-xs bg-slate-800 text-white px-5 py-2 ${className}`}>
      {message}
      <span className="absolute translate-x-2 bottom-[-5px] rotate-45 right-1/2 w-3 h-3 border-solid bg-slate-800"></span>
    </p>
  );
}
