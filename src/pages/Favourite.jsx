import React, { useEffect, useState } from "react";
import { GifState } from "../Context/Context";
import Gif from "../components/Gif";

const Favourite = () => {
  const { gf, favourite } = GifState();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    const { data: gifs } = await gf.gifs(favourite);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, [favourite]);

  return (
    <div className="mt-2">
      <span className="faded-text">My Favourites</span>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
