import { useEffect, useState } from "react";

const useInfiniteScroll = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (loading) return;

    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;

    if (scrolledToBottom) {
      setLoading(true);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return { pageNumber, setPageNumber, loading, setLoading };
};

export default useInfiniteScroll;
