import React from "react";

interface props {
  type: "button" | "submit";
  title: string;
  onClick?: () => void;
}
const Button: React.FC<props> = ({ type, title, onClick }) => {
  return (
    <button
      className="border-2 border-black py-1 px-2"
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
