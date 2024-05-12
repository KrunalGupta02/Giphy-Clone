import React, { useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="Header-logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {/* render categories */}
          <Link className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
            Reactions
          </Link>
          <button>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategory ? "gradient" : ""
              } border-b-4 hidden lg:block`}
              onClick={() => setShowCategory(!showCategory)}
            />
          </button>

          <div className="h-9 bg-gray-700 px-6 pt-1.5 cursor-pointer rounded">
            <Link to="/favourite">Favourite Gif</Link>
          </div>

          <button>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-400 block lg:hidden "
            />
          </button>
        </div>
        {showCategory && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span>Categories</span>
            <hr />
            <div>
              <Link className="font-bold">Reactions</Link>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
    </nav>
  );
};

export default Header;

// Contents inside the header
/*
- logo 
- categories
- fav gif buttn 
search bar
 */
