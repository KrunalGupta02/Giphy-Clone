import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const gifContext = createContext();

const GifProvider = ({ children }) => {
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourite, setFavourite] = useState([]);

  return (
    <gifContext.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favourite }}
    >
      {children}
    </gifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(gifContext);
};

export default GifProvider;
