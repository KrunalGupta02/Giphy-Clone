import { useEffect, useState } from "react";
import Gif from "../components/Gif";
import { GifState } from "../Context/Context";
import FilterGif from "../components/Filter-gif";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function Home() {
  const { gf, gifs, setGifs, filter } = GifState();
  const { loading, pageNumber, setPageNumber, setLoading } =
    useInfiniteScroll();

  const fetchTrendingGIFs = async () => {
    console.log(pageNumber);
    const { data } = await gf.trending({
      limit: 10,
      type: filter,
      rating: "g",
      offset: pageNumber * 10,
    });
    // setGifs(data)
    setGifs((prevGifs) => Array.from(new Set([...prevGifs, ...data])));
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchTrendingGIFs();
    }
  }, [loading, filter]);

  useEffect(() => {
    setGifs([]); // Clear previous GIFs on filter change
    setPageNumber(0); // Reset page number
    setLoading(true); // Trigger initial load
  }, [filter]);

  return (
    <div className="">
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />

      <FilterGif showTrending />

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
