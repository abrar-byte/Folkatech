import React, { useState } from "react";
import { ReactComponent as Basket } from "../assets/basket.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as User } from "../assets/user.svg";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as BurgerMenu } from "../assets/burger-menu-dark.svg";
import { ReactComponent as DownWhite } from "../assets/down-white.svg";
import { ReactComponent as ChevronRights } from "../assets/chevrons-right.svg";

import { Link } from "react-router-dom";

export default function Header({ setFilter, filter }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-end px-2 py-5  bg-white mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-end">
          <div className="w-full relative flex justify-end lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <BurgerMenu />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center  " +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto ">
              <li>
                <div className="relative w-80 mb-3 md:mb-0 md:w-96 ">
                  <input
                    type="text"
                    value={value}
                    className="block p-2.5 w-full z-20 text-sm shadow-md text-gray-900 bg-gray-50 rounded-r-md rounded-l-md focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Cari Produk"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      setFilter({
                        ...filter,
                        keyword: value,
                      })
                    }
                    className="absolute top-0 right-0 shadow-md p-2.5 text-sm font-medium text-white bg-dangerious rounded-r-md  hover:bg-red-800 "
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75"
                  href="#favorite"
                >
                  <Heart className="w-5 h-5" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <Basket className="w-5 h-5" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <User className="w-5 h-5" />
                  <Down />
                  {/* <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Pin</span> */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-gray-200 h-16">
        <button className="flex  items-center uppercase text-white bg-dangerious text-xl md:ml-16 h-full px-8 font-normal">
          Belanja
          <span className="ml-2">
            <DownWhite />
          </span>
        </button>
      </div>

      <nav className="flex md:ml-16 mt-5">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 "
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRights />

              <Link
                to="/home"
                className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-900 md:ml-2 "
              >
                Produk
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRights />

              <span className="ml-1 text-sm font-medium text-dangerious md:ml-2 ">
                Coffe
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}
