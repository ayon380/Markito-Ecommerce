"use client";
// import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Fade, Slide } from "react-awesome-reveal";
import Link from "next/link";
import Loading from "../components/Loading";
import Image from "next/image";
import StarRating from "@/components/stars";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchTrendingProducts = async () => {
    try {
      const response = await fetch("/api/trending");
      const data = await response.json();
      setProducts(data.products); // Assuming the API returns the 'products' array containing trending products
      setLoading(false);
      console.log(data.products);
    } catch (error) {
      console.error("Error fetching trending products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrendingProducts();
    const timer = setTimeout(() => {
      setLoading(false);
      console.log(products);
    }, 500); // Set the time (in milliseconds) for how long you want to show the loading component
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>
        {/* <link rel="icon" href="/logo.png" sizes="any" /> */}
        <div
          className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <Loading />
        </div>
        <div className="h-24 bg-gray-100">L</div>
        <div className="lp bg-gray-100">
          <Carousel showArrows={true} showThumbs={false} dynamicHeight>
            <div>
              <Slide direction="up" duration={1500} cascade triggerOnce>
                <div className="flex justify-start item mx-96  ">
                  <div className="head my-auto">
                    <div className="p text-left font-semi-bold text-3xl mb-5">
                      New Arrivals
                    </div>
                    <div className="flex text-left text-7xl font-bold mb-5">
                      <div className="l1">SHOE</div>
                      <div className="l2 text-orange-500">COLLECTIONS</div>
                    </div>
                    <div className="p text-left mb-5 text-gray-500 font-semibold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat porro labore consequatur a sapiente voluptatem
                      vero eligendi excepturi maxime animi.
                    </div>
                    <Link href="/shop">
                      <button className="bg-orange-500 rounded-md p-2 mt-5  text-white shadow-md ">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                  <div className="w-auto h-auto">
                    <Image
                      className="object-contain h-full w-full"
                      src="/slider-img.png"
                      alt="Slider 1"
                      width={300}
                      height={500}
                    />
                  </div>
                </div>
              </Slide>
            </div>
            <div>
              <Image alt="" height={300} width={300} src="/slider-img.png" />
              <p className="legend">Legend 2</p>
            </div>
          </Carousel>
        </div>
        <div className="h-24 bg-gray-100"></div>
        <div className="flex mx-96 justify-between text-2xl mt-20 mb-10 bg-white">
          <Slide direction="up" duration={1500} triggerOnce>
            <div className="men flex mr-5 bg-slate-100 w-48 h-24 rounded-md my-10">
              <div className="lp">
                <Image
                  width={100}
                  alt=""
                  height={100}
                  className="p-3"
                  src="/men.png"
                ></Image>
              </div>
              <div className="text font-bold my-auto">Men</div>
            </div>
            <div className="men flex mr-5 bg-slate-100 w-48 h-24 rounded-md my-10">
              <div className="lp">
                <Image
                  width={100}
                  alt=""
                  height={100}
                  className="p-3 mt-3"
                  src="/women.png"
                ></Image>
              </div>
              <div className="text  pr-5 font-bold my-auto">Women</div>
            </div>
            <div className="men flex mr-5 bg-slate-100 w-48 h-24 rounded-md my-10">
              <div className="lp">
                <Image
                  width={100}
                  alt=""
                  height={100}
                  className="p-3"
                  src="/mobile.png"
                ></Image>
              </div>
              <div className="text font-bold my-auto">Mobile</div>
            </div>
            <div className="men flex mr-5 bg-slate-100 w-48 h-24 rounded-md my-10">
              <div className="lp">
                <Image
                  width={100}
                  alt=""
                  height={100}
                  className="p-3 mt-2"
                  src="/drone.png"
                ></Image>
              </div>
              <div className="text font-bold my-auto">Drone</div>
            </div>
            <div className="men flex mr-5 bg-slate-100 w-48 h-24 rounded-md my-10">
              <div className="lp">
                <Image
                  width={100}
                  alt=""
                  height={100}
                  className="p-3"
                  src="/t-shirt.png"
                ></Image>
              </div>
              <div className="text  font-bold my-auto">TShirts</div>
            </div>
          </Slide>
        </div>

      </div>{" "}
      <div className="flex mx-96 my-20 justify-between" >
        <Slide direction="up" duration={1500} triggerOnce >
          {products &&
            products.slice(0, 4).map((product) => (
              <Link
                href={`/products/${product.product_id.name}`}
                key={product.product_id._id}
              >
                <div
                  key={product.product_id._id}
                  className="c1 mr-5 h-full w-64 flex flex-col justify-between items-center"
                >
                  <div className="pl p-2 mb-4 bg-gray-100">
                    <div
                      className="w-64 h-64"
                      style={{
                        backgroundImage: `url("${product.product_id.images &&
                          product.product_id.images[0]
                          }")`,
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                      }}
                    />
                  </div>
                  <div className="bl mb-2">
                    <StarRating rating={product.product_id.stars} />
                  </div>
                  <div className="text-center font-bold">
                    {product.product_id.name}
                  </div>
                  <div className="price text-center text-orange-500">
                    ₹{product.product_id.price}
                  </div>
                </div>
              </Link>
            ))}
        </Slide>
      </div>
      <div className="flex mx-96 justify-between mb-24">
        <Slide direction="left" duration={1500} cascade triggerOnce>
          <div className="lp flex bg-gray-100 mr-6">
            <div className="jl my-auto ml-10 mr-28">
              <div className="lp text-2xl mb-2 font-extrabold">Get 50% OFF</div>
              <div className="hhj font-bold mb-2 text-xl">
                On Women Collection
              </div>
              <div className="qw text-orange-600 font-bold">
                <Link href="/shop">Shop Now</Link>
              </div>
            </div>
            <Image
              width={180}
              height={400}
              alt=""
              src="/product-banner-img.png"
              className="h-60 pr-5 pt-6"
            ></Image>
          </div>
        </Slide>
        <Slide direction="right" duration={1500} cascade triggerOnce>
          <div className="lp flex bg-gray-100">
            <div className="jl my-auto ml-10 mr-28">
              <div className="lp text-2xl mb-2 font-extrabold">Get 50% OFF</div>
              <div className="hhj font-bold mb-2 text-xl">
                On Women Collection
              </div>
              <div className="qw text-orange-600 font-bold">
                <Link href="/shop">Shop Now</Link>
              </div>
            </div>
            <Image
              width={180}
              height={400}
              alt=""
              src="/product-banner-img.png"
              className="h-60 pr-5 pt-6"
            ></Image>
          </div>
        </Slide>
      </div >
      <div className="flex justify-center px-96 my-10 bg-gray-100">
        <div className="pl my-24">
          <div className="l text-left text-orange-500 mb-3">
            Get 50% Discount On
          </div>
          <div className="aq font-bold mb-2 text-3xl">
            Best Price & Great Quality
          </div>
          <div className="fg text-left mb-3 text-gray-600 font-semibold ">
            Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
            ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
            tempus.
          </div>
          <button className="px-4 py-2 rounded-md text-white bg-orange-500 tetx-white rouned-sm">
            SHOP NOW
          </button>
        </div>
        <Image
          height={400}
          width={400}
          alt=""
          src="/drone.png"
          className="w-96  my-5 ml-20"
        ></Image>
      </div>
      <div className="lp mx-96 font-bold text-5xl mt-20 mb-10">Trending Products</div>
      <div className=" mx-96 border-4 border-black mb-10"></div>
      <div className="flex mx-96 mb-20">
        <div className="kjfghs w-2/5 p-5 mr-10 bg-gray-100 ">
          <div className="pl my-24 ">
            <div className="l text-left text-orange-500 mb-3">
              Get 50% Discount On
            </div>
            <div className="aq font-bold mb-2 text-3xl">
              Best Price & Great Quality
            </div>
            <div className="fg text-left mb-3 text-gray-600 font-semibold ">
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
              tempus.
            </div>
            <button className="px-4 py-2 rounded-md text-white bg-orange-500 tetx-white rouned-sm">
              SHOP NOW
            </button>
          </div>
          <Image
            width={400}
            height={400}
            alt=""
            src="/product-banner-img.png"
            className="mx-auto h-54 my-5 "
          ></Image>
          <div className="lp bg-white"></div>
        </div>
        <div className="pl">
          <div className="flex flex-wrap ">
            .
            {products &&
              products.slice(0, 6).map((product) => (
                <Link
                  href={`/products/${product.product_id.name}`}
                  key={product.product_id._id}
                >
                  <div
                    key={product.product_id._id}
                    className="c1 mr-5 h-full w-64 flex flex-col justify-between items-center"
                  >
                    <div className="pl p-2 mb-4 bg-gray-100">
                      <div
                        className="w-64 h-64"
                        style={{
                          backgroundImage: `url("${product.product_id.images &&
                            product.product_id.images[0]
                            }")`,
                          backgroundSize: "cover",
                          backgroundPosition: "top",
                        }}
                      />
                    </div>
                    <div className="bl mb-2">
                      <StarRating rating={product.product_id.stars} />
                    </div>
                    <div className="text-center font-bold">
                      {product.product_id.name}
                    </div>
                    <div className="price text-center text-orange-500">
                      ₹{product.product_id.price}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div />
    </>
  );
}
