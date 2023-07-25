"use client"
import React from 'react'
import { AiFillLike, AiOutlineComment } from 'react-icons/ai'
import { BsFillPersonFill, BsFillShareFill, BsPinterest } from 'react-icons/bs'
import { BiLogoFacebook } from "react-icons/bi";
import {
    AiOutlineGooglePlus,
    AiOutlineTwitter,
    AiFillLinkedin,
} from "react-icons/ai";
import { Slide } from 'react-awesome-reveal';
import Loading from '../../../components/Loading'
import Image from 'next/image';
const Page = ({ params }) => {
    const slug = params.slug;
    const [data, setData] = React.useState({});
    const [loading, setloading] = React.useState(true)
    React.useEffect(() => {
        const first = async () => {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                const as = await res.json();
                console.log(as.blog);
                setData(as.blog);
                setloading(false)
                if (!as.success) {
                    throw new Error(as.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        first()
    }, [slug])
    return (
        <div>
            <div
                className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <Loading />
            </div>
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 " >
                    <div className="text-6xl font-bold pb-5">Blog Detail</div>
                    <div className="flex">
                        <div className="text-xl">Home / </div>
                        <div className="text-xl text-orange-600"> Blog Detail</div>
                    </div>
                </div>
                <div className="img">
                    <Slide direction="right" duration={1500} cascade triggerOnce>
                        <Image height={300} width={500} alt="" src="/contact.png"></Image>
                    </Slide>
                </div>
            </div>
            <div className="flex mx-96">
                <Slide direction="up" duration={1500} cascade triggerOnce>
                    <div className="m1 mt-28">
                        <Image height={300} width={700} src={data.image} alt=""></Image>
                        <div className="h1 text-3xl py-10 font-bold ">{data.title}</div>
                        <div className="h1 flex font-bold mb-7">
                            <BsFillPersonFill /><div className="lk -mt-1 ml-2 mr-4">
                                By {data.user ? data.user.firstName : ""}</div>
                            <AiOutlineComment /><div className="lk -mt-1 ml-2 mr-4">
                                Comment ({data.comments ? data.comments.length : '0'})</div>
                            <AiFillLike /><div className="lk -mt-1 ml-2 mr-4"> Likes {data.likes}</div>

                            <BsFillShareFill /> <div className="lk -mt-1 ml-2 mr-4">Share</div>
                        </div>
                        {data.content}
                        <div className="border my-10"></div>
                        <div className="flex mb-10">
                            <Image height={100} width={200} className='rounded-md' alt="" src={data.user ? data.user.dp : ""}></Image>
                            <div className="nl ml-10 ">
                                <div className="h1 font-bold text-3xl ">{data.user ? data.user.fisrtName : ""}</div>
                                <div className="lk text-">{data.user ? data.user.info : ""}</div>
                            </div>
                        </div>
                    </div></Slide>
                <div className="folow  mt-28 ">
                    <div className="bl border border-gray-100 mb-10">
                        <div className="h1 text-center p-4 text-xl bg-gray-100 font-bold">Follow Us</div>
                        <div className=" flex justify-between p-10  text-white  text-3xl">
                            <a href="#" className="mr-2 bg-black  p-2 rounded-xl m-2">
                                <BiLogoFacebook />
                            </a>
                            <a href="#" className="mr-2  bg-black p-2 rounded-xl m-2">
                                <AiOutlineGooglePlus />
                            </a>
                            <a href="#" className="mr-2 bg-black p-2 rounded-xl m-2 active">
                                <AiOutlineTwitter />
                            </a>
                            <a href="#" className="mr-2 bg-black p-2 rounded-xl m-2">
                                <AiFillLinkedin />
                            </a>
                            <a href="#" className="mr-2 bg-black p-2 rounded-xl m-2">
                                <BsPinterest />
                            </a>
                        </div>
                    </div>
                    <div className="rp border border-gray-100">
                        <div className="h1 h1 text-center p-4 text-xl bg-gray-100 font-bold">
                            Recent Post
                        </div>
                        <div className="flex p-4">
                            <Image height={100} width={100} alt="" src="/list-1.jpg"></Image>
                            <div className=" pl-6 t1"><div className="e3">The most anticipated</div>
                                <div className="bw pt-2 text-orange-500">26 February 2019</div></div>

                        </div>
                        <div className="flex p-4">
                            <Image height={100} width={100} alt="" src="/list-1.jpg"></Image>
                            <div className=" pl-6 t1"><div className="e3">The most anticipated</div>
                                <div className="bw pt-2 text-orange-500">26 February 2019</div></div>

                        </div>
                        <div className="flex p-4">
                            <Image height={100} width={100} alt="" src="/list-1.jpg"></Image>
                            <div className=" pl-6 t1"><div className="e3">The most anticipated</div>
                                <div className="bw pt-2 text-orange-500">26 February 2019</div></div>

                        </div>
                    </div>
                    <div className="cat border border-gray-100">
                        <div className="h1 h1 text-center p-4 text-xl bg-gray-100 font-bold mb-5">Categories</div>
                        <div className="p px-4">
                            Men's Fashion <br />
                            <div className="border my-2 "></div>
                            Women's Fashion <br /> <div className="border my-2"></div>
                            Customer Service <br /> <div className="border my-2"></div>
                            Professional Solutions<br /> <div className="border my-2"></div>
                            Company Profile
                            <div className="lk pb-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page