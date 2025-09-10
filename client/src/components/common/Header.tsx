import React from "react";
import ivoteeIcon from "./ivotee PNG.png";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={ivoteeIcon}
              className="h-40 w-40 text-primary-600"
              alt="project icon"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
