import React, { useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { urlFor } from "../sanityConfig";

import { deleteIpe, saveIpe } from "../utils/manageIpes";
import Alert from "./Alert";
function Ipe({ ipe }) {
  const { image, postedBy, destination, savedBy, _id } = ipe;
  const userData = useRouteLoaderData("root");
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [savedPost, setsavedPost] = useState(
    ipe?.savedBy?.map(item => item?.savedBy?._id)?.includes(userData?._id)
  );
  const [savedPostLength, setsavedLength] = useState(savedBy?.length || 0);
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleted, setisDeleted] = useState(false);

  const navigate = useNavigate();

  const closeAlert = () => {
    setShowAlert(false);
  };
  if (isDeleted) {
    return null;
  }
  return (
    <div className="m-2">
      {showAlert && (
        <Alert message="ipe saved " duration={2000} closeAlert={closeAlert} />
      )}
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/ipe-detail/${ipe._id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out bg-blackOverlay"
      >
        {image && (
          <img
            className="rounded-lg w-full "
            src={urlFor(image).width(250).url()}
            alt="user-post"
            referrerPolicy="no-referrer"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${urlFor(image).url()}?dl=`}
                  download
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  title="download Ipe"
                >
                  <MdOutlineDownloadForOffline />
                </a>
              </div>
              {savedPost ? (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setShowAlert(true);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold pe-2 py-1 text-sm rounded-3xl hover:shadow-md outline-none"
                >
                  <span className="bg-white rounded-full px-2 py-1 mr-[2px] text-black border-2 border-red-500 outline-none">
                    {savedPostLength}
                  </span>
                  Saved
                </button>
              ) : (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (!savedPost) {
                      setSavingPost(true);
                      saveIpe(
                        ipe._id,
                        userData._id,
                        setsavedLength,
                        setSavingPost,
                        setsavedPost
                      );
                    }
                  }}
                  type="button"
                  className="bg-white opacity-70 hover:opacity-100 text-red-500 font-bold pe-2 py-1 text-sm rounded-3xl hover:shadow-md outline-none"
                  disabled={savingPost}
                >
                  <span className="bg-white rounded-full px-2 py-1 mr-[2px] text-black border-2 border-red-500 outline-none">
                    {savedPostLength}
                  </span>
                  {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-1 text-black font-bold py-1 px-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md text-sm"
                  rel="noreferrer nofollow noopener"
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === userData?._id && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        "do you want to delete ipe, ipes deleted cant be recovered"
                      )
                    ) {
                      deleteIpe(_id, setisDeleted);
                    }
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
          referrerPolicy="no-referrer"
        />
        <p className="font-semibold capitalize">
          {postedBy?.firstName + " " + postedBy?.lastName}
        </p>
      </Link>
    </div>
  );
}

export default Ipe;
