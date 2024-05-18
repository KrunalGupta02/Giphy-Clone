import React, { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../Context/Context";
import GifSearch from "./Gif-Search";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  const { gf, filter, setFilter, favourite } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

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
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
                to={`/${category.name_encoded}`}
              >
                {category.name}
              </Link>
            );
          })}

          <button>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategory ? "gradient" : ""
              } border-b-4 hidden lg:block`}
              onClick={() => setShowCategory(!showCategory)}
            />
          </button>

          {favourite.length > 0 && (
            <div className="h-9 bg-gray-700 px-6 pt-1.5 cursor-pointer rounded">
              <Link to="/favourite">Favourite Gif</Link>
            </div>
          )}

          <button onClick={() => setShowCategory(!showCategory)}>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-400 block lg:hidden "
            />
          </button>
        </div>
        {showCategory && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (
                  <Link
                    to={`/${category.name_encoded}`}
                    key={category.name}
                    className="font-bold"
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <GifSearch />
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
