"use client"
// import "react-multi-carousel/lib/styles.css";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Slide } from "react-awesome-reveal";
import Image from 'next/image'
// requires a loader
const page = () => {
    return (
        <div>
            <div className="flex justify-between px-0 md:px-96 bg-red-50">
                <div className="mainhead pt-14 md:28 pb-0 mb:pb-36 " >
                    <div className="pl-3 text-4xl mr-5 md:text-6xl md:mt-20  font-bold pb-5">About Us</div>
                    <div className="flex pl-4">
                        <div className="text-sm md:text-xl ">Home / </div>
                        <div className="text-sm md:text-xl text-orange-600"> About Us</div>
                    </div>
                </div>
                <div className="img mt-24">
                    <Slide direction="right" duration={1500} cascade triggerOnce>
                        <Image height={400} width={400} alt="" src="/contact.png"></Image></Slide>
                </div>
            </div>
            <div className="main flex flex-wrap  justify-between h-auto px-4 py-6 md:px-20 lg:px-32 xl:px-96">
                <Slide direction="up" duration={500} cascade triggerOnce>
                    <div className="tiles1">
                        <div className="h1 font-extrabold text-3xl pb-4">Who We Are?</div>
                        <div className='w-96 text-base'>
                            Allow me to take you behind the scenes of an incredible journey - the creation of this Ecommerce Website, crafted as a Personal Project by none other than myself. This voyage of creation was nothing short of a remarkable learning expedition, a testament to my dedication and tenacity. Crafting this website stood as one of my most formidable challenges to date, pushing the boundaries of my skills and perseverance.<br></br><br></br>

                            To bring this vision to life, I delved deep into the intricate realm of MongoDB, mastering its complexities. Next.js 13.4 became my trusted ally, enabling seamless user experiences and dynamic functionalities. The integration of Razorpay added another layer of finesse, ensuring secure and streamlined transactions. Docker played its part, ensuring efficient deployment and scalability, while TailwindCSS lent its aesthetic prowess, shaping the website's visual appeal. React Awesome Reveal contributed its magic touch, adding captivating animations that breathe life into each interaction.
                            <br></br><br></br>
                            This website is the harmonious symphony of Next.js, MongoDB, Razorpay, Docker, TailwindCSS, and React Awesome Reveal, each playing a unique note to create a seamless masterpiece.
                            <br></br><br></br>
                            As you embark on your journey through this website, I invite you to discover the artistry that has gone into every pixel and line of code. I extend a heartfelt invitation to share this digital creation with your friends and family, spreading the joy and innovation that lies within. I also eagerly welcome any insights or suggestions you may have. Your feedback is invaluable as I continue to refine and enhance this digital creation.
                            <br></br><br></br>
                            Thank you for being a part of this remarkable journey. Your support and appreciation fuel my passion for innovation and continuous improvement.
                        </div>
                    </div>

                    <div className="tiles2 ">
                        <Image height={400} width={400} alt="" className="h-auto w-fit" src="/about-img.png"></Image>
                    </div>
                </Slide>
            </div>
            <div className="lp px-80 rounded-lg my-10">
                <div className="main2 flex flex-wrap  bg-red-50  py-6 rounded-lg">
                    <div className="m1 flex m-3 w-full md:w-auto">
                        <div className="icon rounded-full border-orange-600 border-4 h-13 ">
                            <Image height={80} width={80} alt="" className="p-3" src="/01.png"></Image>
                        </div>
                        <div className="h1 pl-2 text-sm">
                            <div className="p  font-extrabold text-xl pb-1">
                                Customer Support</div>
                            <div className="p">
                                Lorem ipsum dolor sit amet gfh.
                            </div></div>
                    </div>
                    <div className="m1 flex m-3 w-full md:w-auto">
                        <div className="icon rounded-full border-orange-600 border-4 h-13 ">
                            <Image height={80} width={80} alt="" className="p-3" src="/01.png"></Image>
                        </div>
                        <div className="h1 pl-2 text-sm">
                            <div className="p  font-extrabold text-xl pb-1">
                                Customer Support</div>
                            <div className="p">
                                Lorem ipsum dolor sit amet gfh.
                            </div></div>
                    </div>
                    <div className="m1 flex m-3 w-full md:w-auto">
                        <div className="icon rounded-full border-orange-600 border-4 h-13 ">
                            <Image height={80} width={80} alt="" className="p-3" src="/01.png"></Image>
                        </div>
                        <div className="h1 pl-2 text-sm">
                            <div className="p  font-extrabold text-xl pb-1">
                                Customer Support</div>
                            <div className="p">
                                Lorem ipsum dolor sit amet gfh.
                            </div></div>
                    </div>
                    <div className="m1 flex m-3 w-full md:w-auto">
                        <div className="icon rounded-full border-orange-600 border-4 h-13 ">
                            <Image height={80} width={80} alt="" className="p-3" src="/01.png"></Image>
                        </div>
                        <div className="h1 pl-2 text-sm">
                            <div className="p  font-extrabold text-xl pb-1">
                                Customer Support</div>
                            <div className="p">
                                Lorem ipsum dolor sit amet gfh.
                            </div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page