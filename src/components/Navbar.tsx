import React, { useEffect } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <nav className="bg-white sticky w-full z-20 top-0 left-0 shadow-xl font-bold">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-96 p-4">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              className="h-8 mr-3 w-auto"
              alt="Flowbite Logo" width={100}
              height={100}
            />

          </a>
          <div className="flex md:order-2">
            <div className="text-2xl pr-4">
              <Link href="/login">
                <MdOutlineAccountCircle /></Link>
            </div>
            <div className="text-2xl pr-4">
              <Link href="/cart">
                <AiOutlineShoppingCart /></Link>
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-black bg-black rounded hover:text-orange-600 md:bg-transparent md:text-black md:p-0 active:text-orange-600"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="block py-2 pl-3 pr-4 active:text-orange-500 text-black bg-black rounded hover:text-orange-600 md:bg-transparent md:text-black md:p-0 "
                >
                  Shop
                </a>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="block py-2 pl-3 pr-4 text-black bg-black rounded hover:text-orange-600 md:bg-transparent md:text-black md:p-0  active:text-orange-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-black bg-black rounded hover:text-orange-600 md:bg-transparent md:text-black md:p-0  active:text-orange-600"
                >
                  Pages
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="block py-2 pl-3 pr-4 text-black bg-black rounded hover:text-orange-600 md:bg-transparent md:text-black md:p-0  active:text-orange-600"
                >
                  Blogs
                </a>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className="block py-2 pl-3 pr-4 text-black bg-black rounded hover:text-orange-600 md:bg-transparent md:text-black md:p-0  active:text-orange-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
