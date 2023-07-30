"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { AiFillDelete } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading';
import { Slide } from 'react-awesome-reveal'
const Page = () => {
    const [cart, setCart] = React.useState([])
    const router = useRouter()
    const [loading, setloading] = React.useState(true)
    // const pathname = usePathname()

    const handlecheckout = async () => {
        localStorage.setItem('type', 'cart')
        localStorage.setItem('cart', JSON.stringify(cart))
        // setCart([])
        // updateCart([])
        router.push('/checkout')

    }
    const calculateGrandTotal = () => {
        if (cart) {
            const grandTotal = cart.reduce((total, item) => {
                const itemTotal = item.price * item.quantity;
                return total + itemTotal;
            }, 0);

            return grandTotal;
        }
    };
    const calculateTotalForItem = (item) => {
        return item.price * item.quantity;
    };

    const updateCart = async (updatedCart) => {
        const token = localStorage.getItem('user');
        try {
            const res = await fetch('/api/cart/update', {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ cart: updatedCart }), // Send the updated cart data to the API
            });
            const data = await res.json();
            if (data.success) {
                // Update the cart in the state if the API call is successful
                toast.success('Cart updated successfully');
                // setCart(updatedCart);
            } else {
                // Handle the case where the API call fails
                throw new Error('Error updating cart');
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update Cart")
            // Handle fetch or other errors
        }
    };
    const handleIncrement = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity++;
        setCart(updatedCart);
        updateCart(updatedCart);
    };

    const handleDecrement = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
            setCart(updatedCart);
            updateCart(updatedCart);
        }
    };

    const handleDelete = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        updateCart(updatedCart);
    };
    React.useEffect(() => {
        const first = async () => {
            if (!localStorage.getItem("user") || localStorage.getItem("user") === "undefined") {
                router.push('/login')
            } else {
                const token = localStorage.getItem("user")
                try {
                    const res = await fetch('api/cart/get', {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }),
                    });
                    const as = await res.json();
                    console.log(as.cart);
                    setCart(as.cart);
                    setloading(false)
                    if (!as.success) {
                        router.push('/')
                    }
                } catch (error) {
                    console.log(error);
                    router.push('/')
                }
            }
        }
        first()
    }, [])
    return (
        <div>
            <div
                className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <Loading />
            </div>
            <ToastContainer />
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 " >
                    <div className="text-6xl font-bold pb-5">My Cart</div>
                    <div className="flex">
                        <div className="text-xl">Home / </div>
                        <div className="text-xl text-orange-600"> My Cart</div>
                    </div>
                </div>
                <div className="img mt-10">
                    <Slide direction="right" duration={1500} cascade triggerOnce>
                        <Image width={400} height={400} alt="" src="/contact.png"></Image></Slide>
                </div>
            </div>
            <Slide direction="up" duration={1500} cascade triggerOnce>{cart &&
                cart.length === 0 ? <div className="flex justify-center my-20"><h1 className="text-3xl font-bold">No Items in Cart</h1></div> :

                <div className="main mx-96 border rounded-xl my-24 p-7 border-gray-300">
                    <h1 className='font-bold text-4xl'>Shopping Cart</h1>
                    <div className='flex justify-around font-bold mt-7'>
                        <div className='flex'>
                            Product</div>
                        <div className='flex'>
                            Name</div>
                        <div className='flex'>
                            Price</div>
                        <div className='flex'>
                            Quantity</div>
                        <div className='flex'>
                            Total</div>
                        <div className='flex'>
                            Action</div>

                    </div>
                    <div className="border rounded-xl border-black "></div>
                    {cart && cart.map((item, index) => {
                        return (
                            <div key={index} className='flex justify-around p-3 '>
                                <Image width={400} height={400} alt="" className="bg-gray-200 w-20 object-contain h-20" src={item.product.images[0]}></Image>
                                <div className="m1 mt-5">
                                    {item.product.name}</div>
                                <div className="price font-bold text-xl mt-5">{item.price}</div>
                                <div className="q mt-5">
                                    <button onClick={() => handleDecrement(index)} className="bg-gray-300 rounded-xl w-4 mr-2">-</button>
                                    {item.quantity}<button onClick={() => handleIncrement(index)} className="bg-gray-300 rounded-xl w-4 ml-2">+</button>
                                </div>
                                <div className="total font-bold text-xl mt-5">{calculateTotalForItem(item)}</div>
                                <div className="act mt-5" onClick={() => {
                                    handleDelete(index)
                                }}><AiFillDelete /></div>
                            </div>
                        )
                    })}

                    <div className="border rouned-xl border-gray-500"></div>
                    <div className="main2 flex justify-between mt-7">
                        <button onClick={() => { router.push('/') }} className="bg-orange-500 hover:bg-orange-600 p-3 text-white rounded-md"> Continue Shopping</button>
                        <div className="to font-bold text-xl ">
                            Grand Total: ${calculateGrandTotal()}</div>
                        <button onClick={handlecheckout} className="bg-black  hover:bg-orange-600 p-3 text-white rounded-md">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>}</Slide>
        </div>

    )
}

export default Page