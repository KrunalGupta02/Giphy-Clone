import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/Context";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({}); // for storing the current gif
  const [related, setRelated] = useState([]);

  const [readMore, setReadMore] = useState(false);

  const { gf, addToFavourite, favourite } = GifState();

  const shareGif = () => {};

  const EmbedGif = () => {};

  const fetchGifs = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelated(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGifs();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {/* sidebar */}
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user.avatar_url}
                alt={gif?.user.display_name}
                className="h-14"
              />

              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {/* This will format the /n and spaces */}
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}

                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider"></div>

        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* Mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          {/* fav/share/embed */}
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavourite(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favourite.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favourite
            </button>
            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related Gifs</span>
          <div className="columns2 md:columns-2 gap-2">
            {/* We will be starting from 2nd as 1st is already rendered */}
            {related.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
