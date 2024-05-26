import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";
import FilterGif from "../components/Filter-gif";
import { GifState } from "../Context/Context";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { gf, filter, setGifs } = GifState();

  const { query } = useParams();

  const { loading, pageNumber, setPageNumber, setLoading } =
    useInfiniteScroll();

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 10,
      offset: pageNumber * 10,
    });

    // setSearchResults(data);
    setSearchResults((prevGifs) => Array.from(new Set([...prevGifs, ...data])));
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchSearchResults();
    }
  }, [filter, loading]);

  useEffect(() => {
    setGifs([]); // Clear previous GIFs on filter change
    setPageNumber(0); // Reset page number
    setLoading(true); // Trigger initial load
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;
