import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGif = async () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      searchGif();
    }
  };

  return (
    <div className="flex relative ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search all the GIFs and Stickers"
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      {/* This is for the x mark present in the search bar */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}

      {/* This is the magnifying glass in the search bar */}
      <button
        className="bg-gradient-to-r from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
        onClick={searchGif}
      >
        <HiOutlineMagnifyingGlass size={35} className="scale-x-100" />
      </button>
    </div>
  );
};

export default GifSearch;
