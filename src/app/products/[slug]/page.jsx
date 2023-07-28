"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/navigation";
// import StarRating from "../../../components/stars";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { set } from "mongoose";
const Page = ({ params }) => {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const [newComment, setNewComment] = useState("")
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [newReview, setNewReview] = useState({ content: "", stars: 0 })
    const handleRatingChange = (value) => {
        setRating(value);
    };
    const StarRating = ({ rating, onChange }) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => onChange(star)}
                        className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    };
    // const pathname = usePathname()
    const [title, settitle] = useState('')
    const [loadingcomment, setLoadingcomment] = useState(false);
    const [products, setProducts] = useState([]);
    const fetchTrendingProducts = async () => {
        try {
            const response = await fetch("/api/trending");
            const data = await response.json();
            setProducts(data.products); // Assuming the API returns the 'products' array containing trending products

            console.log(data.products);
            0;
        } catch (error) {
            console.error("Error fetching trending products:", error);
        }
    };
    const handleAddReview = async (event) => {
        event.preventDefault();
        if (newReview.content.trim() === "" || newReview.stars === 0) {
            toast.error("Please provide a review and rating.");
            return;
        }

        // Update the product state with the new review
        try {
            const qwe = {
                productid: product._id,
                content: newReview.content,
                rating: newReview.stars
            }
            const res = await fetch("/api/product/review", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("user"),
                }),
                body: JSON.stringify(qwe)
            })
            const data = await res.json()
            if (data.success) {
                getData(title)
                toast.success("Review Added Successfully")
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error("Error Adding Review")
        }
        // Clear the review form after adding the review
        setNewReview({ content: "", stars: 0 });
    }
    const handleBuyNow = async () => {
        // Assuming you want to navigate to '/checkout' and pass some props
        console.log("buying");
        if (product != null) {
            localStorage.setItem("buy", JSON.stringify(product));
            localStorage.setItem("type", "order");
        }
        router.push("/checkout");
    };
    const handleToastClick = () => {
        // Handle click action when the toast is clicked (e.g., // Replace with the desired URL
        router.push("/cart");
        toast.dismiss(); // Dismiss the toast if needed
    };

    const showToast = ({ content }) => {
        toast.info(
            <Link href="/cart" onClick={handleToastClick}>
                {content}
            </Link>,
            {
                // You can add other options for the toast if needed
                autoClose: 10000,
            }
        );
    };
    const handleAddComment = async (event) => {
        try {
            setLoadingcomment(true);
            event.persist();
            event.preventDefault();
            // Assuming you have a function to send a comment to the server and get a response with the updated comments
            const response = await fetch('/api/product/comment', {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("user"),
                }),
                body: JSON.stringify({
                    content: newComment,
                    productid: product._id
                })
            });
            const data = await response.json();
            if (data.success) {
                // setProduct({ ...product, comments: response.comments });
                // window.location.reload();
                getData(title)
                setLoadingcomment(false);
                toast.success("Comment Added Successfully")
                setNewComment(""); // Clear the input field
                // fetchProductData();
            }
        } catch (error) {
            toast.error("Adding Comment failed")
            console.error("Error adding comment:", error);
        }
    };

    const handleAddReply = async (commentId, event) => {
        try {
            event.preventDefault()
            // Assuming you have a function to send a reply to the server and get a
            const newReview = {
                content: content,
                rating: rating,
                productid: product._id
            }
            const res = await fetch('/api/product/review', {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("user"),
                }),
                body: JSON.stringify(newReview)
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Review Added Successfully")
                getData(title)
            }
        } catch (error) {
            console.error("Error adding reply:", error);
            toast.error("Something went wrong")
        }
    };
    const handleaddtocart = async () => {
        // Assuming you want to navigate to '/checkout' and pass some props
        try {
            console.log("adding to cart");
            const req = {
                product: product._id,
                quantity: 1,
                price: product.price,
            };
            const token = localStorage.getItem("user");
            if (product != null) {
                const res = await fetch("/api/cart", {
                    method: "PUT",
                    headers: new Headers({
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({ req }),
                });
                const as = await res.json();
                console.log(as);
                if (as.success) {
                    showToast({ content: "Added to cart,Click here to go to Cart" });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    async function getData(title) {
        console.log("getdata running");
        fetchTrendingProducts();
        const res = await fetch(`/api/product/${title}`, {
            next: { revalidate: 10 },
        });
        const data = await res.json();
        console.log(data);
        setProduct(data.product);
        return data.blog;
    }
    useEffect(() => {
        const fetchProductData = async () => {
            const slug = params.slug.replace(/%20/g, " ");
            settitle(slug)
            const data = await getData(slug);
            setLoading(false);
            console.log(data);
        };
        fetchProductData();
    }, []);
    const [state, setState] = useState(1);
    const [size, setSize] = useState("M");
    return (
        <div>
            <ToastContainer />
            <div
                className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <Loading />
            </div>
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 ">
                    <div className="text-6xl font-bold pb-5">Product Detail</div>
                </div>
                <div className="img">
                    <Image height={400} width={400} src="/contact.png" alt={""}></Image>
                </div>
            </div>

            <div className="flex justify-around  mx-96 my-20">
                <div className="lp mr-24">
                    <div className="lp  ">
                        <Carousel
                            showArrows={true}
                            showIndicators={false}
                            showThumbs
                            dynamicHeight
                            width={"400px"}
                        >
                            {product &&
                                product.images.map((image) => {
                                    return (
                                        <div key={image}>
                                            <img src={image} />
                                        </div>
                                    );
                                })}
                        </Carousel>
                    </div>
                </div>
                <div className="rp ">
                    <div className="text-4xl font-bold pb-5">
                        {product && product.name}
                    </div>
                    <div className="text-2xl font-semibold pb-5">
                        Product Type - {product && product.category}
                    </div>
                    <div className="star mr-11 mb-2 flex text-2xl">
                        <stars product={product} />
                    </div>
                    <div className="flex">
                        <div className="text-3xl font-bold pb-5">
                            ₹{product && product.price}
                        </div>
                        {/* <div className="text-xl font-bold pt-2 pb-5"><s>$500</s></div> */}
                    </div>
                    <div className="flex mb-10">
                        {product &&
                            product.sizes.map((s) => {
                                return (
                                    <button
                                        key={s}
                                        onClick={() => {
                                            setSize(s);
                                        }}
                                        className={`lp rounded-md px-1 mr-2 ${size === s
                                            ? "bg-orange-500 text-white"
                                            : "bg-white text-black"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                    </div>
                    <StarRating rating={product && product.stars} />
                    <div className="desc">{product && product.description}</div>
                    <div className="flex mt-10">
                        <button
                            onClick={handleaddtocart}
                            className="bg-orange-500 text-white px-4 py-2 text-xl rounded-md mr-10 hover:bg-orange-700"
                        >
                            Add To Cart
                        </button>
                        <button
                            className="bg-orange-500 text-white px-4 py-2 text-xl rounded-md mr-10 hover:bg-orange-700"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                    </div>
                    .....
                </div>
            </div>
            <div className=" mx-96 ">
                <div className="flex">
                    <button
                        onClick={() => setState(1)}
                        className={`lp rounded-md  mb-10 font-semibold text-xl  py-2 px-5 mr-5 ${state === 1 ? "bg-orange-500 text-white" : "bg-black text-white"
                            }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setState(2)}
                        className={`lp rounded-md  mb-10 font-semibold text-xl  py-2 px-5 mr-5 ${state === 2 ? "bg-orange-500 text-white" : "bg-black text-white"
                            }`}
                    >
                        Comment
                    </button>
                    <button
                        onClick={() => setState(3)}
                        className={`lp rounded-md  mb-10 font-semibold text-xl  py-2 px-5 mr-5 ${state === 3 ? "bg-orange-500 text-white" : "bg-black text-white"
                            }`}
                    >
                        Reviews
                    </button>
                </div>
                {state === 1 ? (
                    <div className="desc">{product && product.description}</div>
                ) : state === 2 ? (
                    <div className="desc">
                        {/* Displaying comments */}
                        {product &&
                            product?.comments?.map((comment) => {
                                return (
                                    <div
                                        class="flex items-center mb-5 space-x-4"
                                        key={comment.content}
                                    >
                                        <div>
                                            {" "}
                                            <div className="flex">
                                                <Image
                                                    height={100}
                                                    className="rounded-full w-16 h-16 object-cover"
                                                    width={100}
                                                    src={
                                                        comment.user
                                                            ? comment.user.dp
                                                            : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                                                    }
                                                    alt={""}
                                                />{" "}
                                                <div className="ml">
                                                    <div className="font-bold text-accent-orange pl-4">
                                                        {comment.user
                                                            ? comment.user.firstName
                                                            : "Anonymous"}
                                                    </div>
                                                    <div className="content text-sm pl-4 py-2 border-b-1">
                                                        {comment.content}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pl">
                                                {/* Displaying replies */}
                                                {comment.replies.map((reply) => {
                                                    return (
                                                        <div key={reply.content} className="ml-16 flex items-center space-x-4">
                                                            <Image
                                                                height={100}
                                                                className="rounded-full w-10 h-10 object-cover"
                                                                width={100}
                                                                src={
                                                                    reply.user
                                                                        ? reply.user.dp
                                                                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                                                                }
                                                                alt={""}
                                                            />
                                                            <div>
                                                                <div className="font-bold text-accent-orange ">
                                                                    {reply.user
                                                                        ? reply.user.firstName
                                                                        : "Anonymous"}
                                                                </div>
                                                                <div className="content text-sm  py-2 border-b-1">
                                                                    {reply.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {/* Reply to Comment */}
                                            {/* <div className="ml-10">
                                                <form>
                                                    <input
                                                        type="text"
                                                        className="text-sm"
                                                        placeholder="Reply to comment..."
                                                    />
                                                    <button type="submit" className="text-accent-orange">
                                                        Reply
                                                    </button>
                                                </form>
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            })}
                        {/* Add Comment */}
                        <form onSubmit={handleAddComment}> {/* Add onSubmit event handler */}
                            <input
                                type="text"
                                placeholder="Add your comment..."
                                value={newComment} // Bind the input value to the state
                                onChange={(e) => setNewComment(e.target.value)} // Handle input change and update the state
                            />
                            <button
                                type="submit"
                                className="text-white py-2 px-4 rounded-md ml-10 hover:bg-orange-400 bg-orange-500"
                            >
                                {loadingcomment ? "Adding Comment.." : "Add Comment"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="desc">
                        {product &&
                            product.reviews.map((review) => {
                                return (
                                    <div
                                        className="flex items-center space-x-4 mb-5"
                                        key={review.content}
                                    >
                                        <div className="image">
                                            <Image
                                                height={100}
                                                className="rounded-full w-16 h-16 object-cover"
                                                width={100}
                                                alt=""
                                                src={
                                                    review.user
                                                        ? review.user.dp
                                                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                                                }
                                            />
                                        </div>
                                        <div>
                                            <StarRating rating={review.stars} />
                                            <div className="font-bold">
                                                {review.user ? review.user.firstName : "Anonymous"}
                                            </div>
                                            <div className="content">{review.content}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        <form>
                            <textarea
                                placeholder="Add your review..."
                                value={newReview.content}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, content: e.target.value })
                                }
                            />
                            <StarRating
                                rating={newReview.stars}
                                onChange={(rating) =>
                                    setNewReview({ ...newReview, stars: rating })
                                }
                            />
                            <button
                                type="button"
                                onClick={handleAddReview}
                                className="text-white py-2 px-4 rounded-md  hover:bg-orange-400 bg-orange-500"
                            >
                                Add Review
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <div className="text-4xl mx-96 mt-20 mb-10 font-bold">
                Trending Products
            </div>
            <div className="border border-black mx-96"></div>
            <div className="flex mx-96 my-10">
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
                                    ${product.product_id.price}
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Page;
