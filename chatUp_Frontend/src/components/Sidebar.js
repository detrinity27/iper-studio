import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../asset/logo.svg";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";
const categories = ["sport", "medicine ", "gaming", "house", "train"];

function Sidebar({ closeToggle, user }) {
  function handleCloseSidebar() {
    closeToggle();
  }
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-16" />
        </Link>
        <div className="flex flex-col gap-5 border-t-2 border-gray-200 pt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories.slice(0, categories.length - 1).map(category => (
            <NavLink
              to={`/category/${category}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category}
            >
              {/* <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              /> */}
              {category}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.picture}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.given}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
}

export default Sidebar;