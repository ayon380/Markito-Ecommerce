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
                        <div className='w-96 text-base'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus Donec quam felis ultricies.<br></br>
                            <br></br>
                            Nulla consequat massa quis enim Donec pede justo fringilla vele aliquet nec vulputate eget arcu. In enim justo rhoncus imperdieti venenatis vitae justo. Nullam dictum felis eu pede mollis pretiumg Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula porttitor conse vitae eleifend acenim. Aliquam lorem ante, dapibus in viverra quis feugiat a tellus.
                            <br></br><br></br>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</div>
                    </div>

                    <div className="tiles2 ">
                        <Image height={400} width={400} alt="" className="h-auto w-fit" src="/about-img.png"></Image>
                    </div>
                </Slide>
            </div>
            <div className="main2 flex flex-wrap bg-red-50 px-4 py-6 md:px-20 lg:px-32 xl:pl-6
            4">
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
    )
}

export default page