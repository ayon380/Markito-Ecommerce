"use client"
import React from 'react'
import Link from 'next/link'
import { Slide } from "react-awesome-reveal";
import Loading from '../../components/Loading'
import Image from 'next/image'
const Page = () => {
    const [blogs, setBlogs] = React.useState([])
    const [loading, setloading] = React.useState(true)
    React.useEffect(() => {
        const first = async () => {
            try {
                const res = await fetch('api/blogs');
                const as = await res.json();
                console.log(as.blogs);
                setBlogs(as.blogs);
                setloading(false)
                if (!as.success) {
                    throw new Error(as.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        first()
    }, [])
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleString(undefined, options);
    };
    const limitContent = (content) => {
        const words = content.trim().split(' ');
        if (words.length > 20) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return content;
    };

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
                    <div className="text-6xl font-bold pb-5">Blogs</div>
                    <div className="flex">
                        <div className="text-xl">Home / </div>
                        <div className="text-xl text-orange-600"> Blogs</div>
                    </div>
                </div>
                <div className="img mt-10">
                    <Slide direction="right" duration={1500} cascade triggerOnce>
                        <Image width={400} height={400} alt="" src="/contact.png"></Image></Slide>
                </div>
            </div>
            <div className="flex flex-wrap mx-96 my-10">
                <Slide direction="up" duration={500} cascade triggerOnce>
                    {blogs &&
                        blogs.map((blog) => {
                            return (
                                <div className="kl" key={blog.title}>
                                    <Link href={`/blogs/${blog.title}`}>
                                        <div className="card border h-96 p-2 m-4 w-80 flex flex-col">
                                            <Image width={300} height={300} className="w-full h-40 object-cover" src={blog.image} alt={blog.title} />
                                            <div className="date absolute mt-32 p-2 text-sm font-bold bg-white">
                                                {formatDate(blog.createdAt)}
                                            </div>
                                            <div className="info mt-6 px-2">
                                                By {blog.user.firstName + " " + blog.user.lastName} Comment(15) Likes({blog.likes})
                                            </div>
                                            <div className="font-bold text-xl my-2 px-2">{blog.title}</div>
                                            <div className="p px-2 mb-8 flex-grow">{limitContent(blog.content)}</div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                </Slide>
            </div>

        </div>
    )
}

export default Page