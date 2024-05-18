import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">
      <span>Follow On:</span>

      <div className="flex gap-4 pt-3">
        <a>
          <FaYoutube size={20} />
        </a>
        <a>
          <FaInstagram size={20} />
        </a>
        <a>
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
