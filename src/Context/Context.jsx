import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const gifContext = createContext();

const GifProvider = ({ children }) => {
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourite, setFavourite] = useState([]);

  // Logic for the favourite
  // -> Storing the gif in the local storage (storing the id)

  const addToFavourite = (id) => {
    if (favourite.includes(id)) {
      const updatedFavourite = favourite.filter((itemid) => itemid !== id);
      localStorage.setItem("favGifs", JSON.stringify(updatedFavourite));
      setFavourite(updatedFavourite);
    } else {
      const updatedFavourite = [...favourite];
      updatedFavourite.push(id);
      localStorage.setItem("favGifs", JSON.stringify(updatedFavourite));
      setFavourite(updatedFavourite);
    }
  };

  useEffect(() => {
    const favourite = JSON.parse(localStorage.getItem("favGifs")) || [];
    setFavourite(favourite);
  }, []);

  return (
    <gifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favourite,
        addToFavourite,
      }}
    >
      {children}
    </gifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(gifContext);
};

export default GifProvider;
