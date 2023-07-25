"use client"
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { Slide } from "react-awesome-reveal";
import { HiMail } from "react-icons/hi";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Page = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await fetch('/api/contactus',
            {
                method: 'POST',
                body: JSON.stringify(formData),
            }
        )
        const data = await res.json()
        if (data.success) {
            toast.success('Message sent successfully')
        } else {
            toast.error('Something went wrong')
        }
        // Handle form submission here (e.g., sending data to the server)
        console.log(formData);
    };
    return (
        <div>
            <ToastContainer />
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 " >
                    <div className="text-6xl font-bold pb-5">Contact-Us</div>
                    <div className="flex">
                        <div className="text-xl">Home / </div>
                        <div className="text-xl text-orange-600"> Contact-Us</div>
                    </div>
                </div>
                <div className="img mt-10">
                    <Slide direction="right" duration={1500} cascade triggerOnce>
                        <Image width={400} height={400} alt="" src="/contact.png"></Image></Slide>
                </div>
                T</div>
            <div className="main flex mx-96 justify-between mt-14">
                <Slide direction="up" duration={1000} triggerOnce>
                    <div className="tiles1">
                        <div className="locationm flex mb-16">
                            <div className="location text-white bg-orange-600 text-3xl p-2 rounded-xl mr-5">
                                <IoLocationSharp />
                            </div>
                            <div className="b">
                                208 W 5th GH, Suite 233 <br></br>ABCD Area, Mumbai, India.
                            </div>
                        </div>
                        <div className="phone text-white flex mb-16">
                            <div className="location text-white  bg-orange-600 text-3xl p-2 rounded-xl mr-5">
                                <BiPhoneCall /></div>
                            <div className="b text-black">
                                1-800- 123-4567<br></br>
                                1-800- 123-4567.
                            </div>
                        </div>
                        <div className="phone text-white flex mb-16">
                            <div className="location text-white  bg-orange-600 text-3xl p-2 rounded-xl mr-5">
                                <HiMail /></div>
                            <div className="b text-black">
                                info@companyname.com <br></br>info@companyname.com
                            </div>
                        </div>
                        S</div>
                    <div className="tiles2 ">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <input
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <input
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div className="w2 flex flex-wrap -mx-3">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        type="text"
                                        placeholder="Phone Number"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                            </div>
                            <div className="b3 mb-6">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Leave a comment..."
                                ></textarea>
                            </div>
                            <div className="b4 items-center mb-6">
                                <button
                                    type="submit"
                                    className="bg-orange-600 text-white px-4 py-2 rounded-md text-center"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                </Slide>
            </div>
        </div>
        // </div >
    );
};

export default Page;
