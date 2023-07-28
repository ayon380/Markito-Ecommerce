import React from "react";
import { BiLogoFacebook } from "react-icons/bi";
import {
  AiOutlineGooglePlus,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
const Header = () => {
  return (
    <div>
      <div className="t bg-orange-600 text-xl">
        <div className="cont">
          <div className="r">
            <div className="flex justify-between p-3 mx-4 md:mx-96">
              <div className="flex text-white ">
                <div className="bg-orange-600 ">
                  <select className="option-bg bg-orange-600">
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>
                <div className="lang-drop bg-orange-600">
                  <select className="bg-orange-600">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
              <div className="hidden md:flex justify-end text-white">
                <a href="#" className="mr-2">
                  <BiLogoFacebook />
                </a>
                <a href="#" className="mr-2">
                  <AiOutlineGooglePlus />
                </a>
                <a href="#" className="mr-2 active">
                  <AiOutlineTwitter />
                </a>
                <a href="#" className="mr-2">
                  <AiFillLinkedin />
                </a>
                <a href="#" className="mr-2">
                  <BsPinterest />
                </a>
              </div>
              <div className="md:hidden flex justify-end text-white">
                {/* Mobile-friendly social icons */}
                <div className="mr-2">
                  <BiLogoFacebook />
                </div>
                <div className="mr-2">
                  <AiOutlineGooglePlus />
                </div>
                <div className="mr-2 active">
                  <AiOutlineTwitter />
                </div>
                <div className="mr-2">
                  <AiFillLinkedin />
                </div>
                <div className="mr-2">
                  <BsPinterest />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
