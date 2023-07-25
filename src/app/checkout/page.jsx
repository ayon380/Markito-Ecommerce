"use client"
import React from 'react'
import Image from 'next/image'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
const verify = async () => {
    try {
        const token = localStorage.getItem("user")
        const res = await fetch(`/api/users/verify`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        });
        const d = await res.json();
        if (d.success === true) {
            console.log("succcesss mfsw");
            const user = JSON.parse(localStorage.getItem("userdata"))
            return user
        }
        else {
            console.log("Oh shit");
            return null
        }
    }
    catch (error) {
        console.error("Error while verifying user:", error);
        return null;
    }
}
const Page = () => {
    const [product, setProduct] = React.useState(null)
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(null)
    const [state, setState] = React.useState(null)
    const [cart, setCart] = React.useState(null)
    const [order, setOrder] = React.useState(null)
    const [mainloading, setmainloading] = React.useState(true)
    const router = useRouter()

    const calculateTotal = () => {
        if (!cart || cart.length === 0) return 0;

        // Use reduce to sum the total price of all items in the cart
        const totalPrice = cart.reduce((acc, item) => {
            return acc + item.quantity * item.product.price;
        }, 0);

        return totalPrice;
    };
    const razorpay = async () => {
        try {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Razropay failed to load!!')
                return
            }
            const token = localStorage.getItem("user")
            const data = await fetch('/api/razorpay/createorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ amount: 100*(state == "cart" ? Math.floor(calculateTotal()) : product.price) }),
            }
            )
            const response = await data.json()
            console.log("\n\n" + order + "\n\n Checkout" + calculateTotal() + "\n\n");
            if (response.success && order) {
                const order_id = response.order.id
                const amount = response.order.amount
                console.log(product);
                console.log(product.price)

                const options = {
                    "key": process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                    "amount": 100*(state == "cart" ? Math.floor(calculateTotal()) : product.price), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Markito LLC",
                    "description": "Shopping",
                    "image": "/logo.png",
                    "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    handler: async function (response) {
                        const token = localStorage.getItem("user")
                        console.log("\n\n\n running payment verification\n\n");
                        const data = await fetch('/api/order/payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "authorization": 'Bearer ' + token
                            },
                            body: JSON.stringify({ orderid: order._id }),
                        }
                        )
                        localStorage.removeItem("cart")
                        const response1 = await data.json()
                        console.log(response1.success)
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                        console.log(order_id);
                        console.log(response.razorpay_order_id);
                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_signature);
                        router.push('/orderhistory')
                    },
                    prefill: {
                        name: user.firstName + " " + user.lastName,
                        email: user.email,
                        contact: user.phone,
                    },
                    "notes": {
                        "address": user.city + " " + user.state + " " + user.zipCode
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                const paymentObject = new window.Razorpay(options);
                paymentObject.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                paymentObject.open();
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    const proceed = async () => {
        try {
            setLoading(true)
            if (state == "order") {
                const chec = {
                    user: user._id, // Assuming you have user._id from the user object
                    products: [
                        {
                            product: product._id, // Replace with the actual product ID
                            quantity: 1,
                            price: product.price,
                        },
                    ],
                    totalPrice: product.price,
                    shippingAddress: {
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zipCode: user.zipCode,
                    },
                    status: 'pending',
                };
                const token = localStorage.getItem("user")
                const res = await fetch('/api/order/create', {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(chec), // Convert chec object to JSON string
                });
                const response = await res.json();
                if (response.success) {
                    console.log("done");
                    console.log("Order created:", response.order);
                    setOrder(response.order)
                    console.log("Order before razorpay:", order);
                    // await razorpay()
                    // router.push('/orderhistory')
                }
                else {
                    console.log(response.message);
                }
            }
            else {
                const productsArray = cart.map((item) => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                }));
                const chec = {
                    user: user._id,
                    products: productsArray,
                    totalPrice: calculateTotal(), // Assuming you have a calculateTotal function
                    shippingAddress: {
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zipCode: user.zipCode,
                    },
                    status: 'pending',
                };
                const token = localStorage.getItem("user")
                const res = await fetch('/api/order/create', {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(chec), // Convert chec object to JSON string
                });
                const response = await res.json();
                if (response.success) {
                    console.log("done");
                    console.log("Order created:", response.order);

                    // router.push('/orderhistory')
                    setOrder(response.order)
                    console.log("Order before razorpay:", order);
                    // await razorpay()
                }
                else {
                    console.log(response.message);
                }
            }

        }
        catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        if (order) {
            console.log("Order before razorpay:", order);
            razorpay();
        }
    }, [order]);
    React.useEffect(() => {
        const first = async () => {
            const us = await verify();
            setmainloading(false)
            if (us == null) {
                router.push('/');
            }
            else {
                setUser(us);
            }
        }
        setState(localStorage.getItem("type"))
        setCart(JSON.parse(localStorage.getItem("cart")))
        const q = JSON.parse(localStorage.getItem("buy"))
        setProduct(q)
        first()
    }, [])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }
        )
        ); console.log(user)
    };
    return (
        <div>
            <div
                className={`transition-opacity duration-500 ${mainloading ? "opacity-100" : "opacity-0 pointer-events-none hidden"
                    }`}
            >..
                <Loading />
            </div>
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 " >
                    <div className="text-6xl font-bold pb-5">Checkout</div>
                    <div className="flex">
                        <div className="text-xl">Home / </div>
                        <div className="text-xl text-orange-600">Checkout</div>
                    </div>
                </div>
                <div className="img mt-10">
                    <Image width={400} height={400} alt="" src="/contact.png"></Image>
                </div>
            </div>
            <div className="body mb-20 mx-96">
                <h1 className='text-5xl my-10  font-bold'>
                    Biling Detail
                </h1>
                <div className="nl flex  ">{user &&
                    <div className="ml ">
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="firstName"
                                    name="firstName"
                                    value={user.firstName}
                                    type="firstName"
                                    onChange={handleChange}
                                    autoComplete="firstName"
                                    required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="firstName"
                                    name="lastName"
                                    value={user.lastName}
                                    type="lastName"
                                    onChange={handleChange}
                                    autoComplete="lastName" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email"
                                    name="email"
                                    value={user.email}
                                    type="email"
                                    onChange={handleChange}
                                    autoComplete="email" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone"
                                    name="phone"
                                    value={user.phone} autoComplete="phone" onChange={handleChange}
                                    type="string"

                                />
                            </div>
                        </div>
                        <div className="w-full  mb-6">
                            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="address"
                                name="address"
                                value={user.address} autoComplete="address" onChange={handleChange} placeholder="Address" />
                        </div>

                        <div className="w-full  mb-6 ">
                            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="city"
                                name="city"
                                value={user.city} autoComplete="city" onChange={handleChange} type="text" placeholder="Town/City" />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="state"
                                    name="state"
                                    value={user.state} autoComplete="state" onChange={handleChange} type="text" placeholder="State/Country" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zipCode"
                                    name="zipCode"
                                    value={user.zipCode} autoComplete="zipCode" onChange={handleChange} type="text" placeholder="Postcode" />
                            </div>
                        </div>

                    </div>}
                    <div className="detail ml-8 border w-1/2 text-xl mb-6 rounded-md p-3">
                        <div className="flex justify-between px-12 py-5 text-3xl font-bold">
                            <div className="pt">Product</div>
                            <div className="p">Total</div>
                        </div>
                        <div className="border "></div>
                        <div className="proflex  px-12 py-5">{state == "order" ?
                            <div className="lp">
                                <div className="sd flex text-xl">
                                    <Image className="h-24 w-24 mr-10 " width={400} height={400} alt='' src={product.images[0]}></Image>
                                    <div className="lp pt-1 mr-10">
                                        {product && product.name} x 1
                                    </div>
                                    <div className="rp text-xl p-1">
                                        {product && product.price}
                                    </div></div>
                            </div> : cart && cart.map((item, index) => {
                                return (<div key={index} className="lp">
                                    <div className="sd flex text-xl">
                                        <Image width={400} height={400} alt='' className="h-28 w-28  " src={product.images[0]}></Image>
                                        <div className="lp pt-1">
                                            {item.product.name} x {item.quantity}

                                        </div>
                                        <div className="rp text-xl p-1">
                                            {item.price * item.quantity}
                                        </div>
                                    </div>
                                </div>

                                )
                            })}
                        </div>
                        <div className="border"></div>
                        <div className="subt flex py-5 justify-between px-12">
                            <div className="llp">
                                Subtotal
                            </div>
                            <div className="lrp text-orange-500">
                                {state == "order" ? product && product.price : cart && cart.reduce((a, b) => a + b.price * b.quantity, 0)}
                            </div>
                        </div>
                        <div className="border"></div>
                        <div className="flex py-5 justify-between px-12 ">
                            <div className="llp">
                                Shipping
                            </div>
                            <div className="lrp text-orange-500">
                                Shipping free
                            </div>
                        </div>
                        <div className="border"></div>
                        <div className="flex justify-between px-12 py-5">
                            <div className="llp">
                                Total
                            </div>
                            <div className="total text-orange-500"> {state == "order" ? product && product.price : cart && cart.reduce((a, b) => a + b.price * b.quantity, 0)}</div>
                        </div>
                        <button className="bg-black ml-6 px-6 text-white p-2 rounded-md mb-5" onClick={proceed}>{loading ? "Processing Payment..." : "Proceed to Payment"}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page