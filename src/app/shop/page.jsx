"use client"
import React from 'react'
import Image from 'next/image'
import { Fade, Slide } from "react-awesome-reveal";
import Loading from '../../components/Loading'
import Link from 'next/link'
import StarRating from '../../components/stars'
const Page = () => {
    const [products, setproducts] = React.useState([])
    const [loading, setloading] = React.useState(true)
    React.useEffect(() => {
        const first = async () => {

            try {
                const res = await fetch('api/product');
                const as = await res.json();
                console.log(as.products);
                setproducts(as.products);
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
    return (
        <div>
            <div className={`transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Loading />
            </div>
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 " >
                    <div className="text-6xl font-bold pb-5">Shop</div>
                </div>
                <div className="img">
                    <Slide direction="right" duration={1500} cascade triggerOnce>
                        <Image height={400} width={400} src="/contact.png" alt={''}></Image></Slide>
                </div>
            </div>
            <div className="flex mx-96 my-20">
                <div className="kjfghs w-2/5 p-5 mr-10 bg-gray-100 ">
                    <div className="pl my-24 ">
                        <div className="l text-left text-orange-500 mb-3">
                            Get 50% Discount On
                        </div>
                        <div className="aq font-bold mb-2 text-3xl">Best Price & Great Quality</div>
                        <div className="fg text-left mb-3 text-gray-600 font-semibold ">
                            Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus.
                        </div>
                        <button className="px-4 py-2 rounded-md text-white bg-orange-500 tetx-white rouned-sm">SHOP NOW</button>
                    </div>
                    <Image height={400} width={400} alt="" src="/product-banner-img.png" className="mx-auto h-54 my-5 " ></Image>
                    <div className="lp bg-white"></div>
                </div>
                <div className="pl">
                    <div className="flex flex-wrap my-6 ">
                        <Slide direction="up" duration={1500} triggerOnce>
                            {products &&
                                products.map((product) => (<Link href={`/products/${product.name}`} key={product._id}>
                                    <div key={product._id} className="c1 mr-5 h-full w-64 flex flex-col  justify-between items-center">
                                        <div className="pl p-2  bg-gray-100">
                                            <div
                                                className="w-64 h-64"
                                                style={{ backgroundImage: `url("${product.images && product.images[0]}")`, backgroundSize: "cover", backgroundPosition: "top" }}
                                            />
                                        </div>
                                        <div className="bl mb-1">
                                            <StarRating rating={product.stars} />
                                        </div>
                                        <div className="text-center font-bold">
                                            {product.name}
                                        </div>
                                        <div className="price mb-10 text-center text-orange-500">
                                            ₹{product.price}
                                        </div>
                                    </div>
                                </Link>
                                ))}
                        </Slide>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page