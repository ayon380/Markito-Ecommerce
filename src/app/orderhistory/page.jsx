"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Loading from '@/components/Loading';
import { set } from 'mongoose';
const Page = () => {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const router = useRouter()
    function convertMongoDateToJsDate(mongodbDate) {
        const q = new Date(mongodbDate);
        return q.toLocaleString();
    }
    const calculateTotalQuantity = (products) => {
        if (!products || products.length === 0) return 0;

        // Use reduce to sum the total quantity of all items in the products array
        const totalQuantity = products.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);

        return totalQuantity;
    };

    React.useEffect(() => {
        const first = async () => {
            const token = localStorage.getItem("user")
            try {
                const res = await fetch('api/order/get', {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }),
                });
                const as = await res.json();
                console.log(as.orders);
                setData(as.orders);
                setLoading(false)
                if (!as.success) {
                    router.push('/')
                }
            } catch (error) {
                console.log(error);
                router.push('/')
            }
        }
        first()
    }, [])
    return (
        <div>
            <div
                className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none hidden"
                    }`}
            >..
                <Loading />
            </div>

            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 mt-0" >
                    <div className="text-6xl font-bold pb-5">Order History</div>
                    <div className="flex">
                        <div className="text-xl">Home / </div>
                        <div className="text-xl text-orange-600">Order History</div>
                    </div>
                </div>
                <div className="img mt-10">
                    <Image width={400} height={400} alt="." src="/contact.png"></Image>
                </div>
            </div>
            {data.length === 0 ? <div className="text-5xl font-bold text-center my-10">No Orders Yet</div> :
                <div>
                    <div className="body mx-96 p-10 my-10 
            border ">
                        <div className="h1 text-5xl font-bold pt-6 pb-10">Orders</div>
                        <div className="flex justify-around mr-7 py-5 font-bold ">
                            <div className="q1">Order No.</div>
                            <div className="q2">Order Date</div>
                            <div className="q3">No Of Items</div>
                            <div className="q4">Order Total</div>
                            <div className="q4">Status</div>
                        </div>
                        <div className="border-black border-2 "></div>
                        {data && data.map((item, index) => {
                            return (
                                <><div className="flex justify-around font-semibold py-5 text-gray-500">
                                    <div className="q1">#{item.ID}</div>
                                    <div className="q2 ">{convertMongoDateToJsDate(item.createdAt)}</div>
                                    <div className="q3">{calculateTotalQuantity(item.products)}</div>
                                    <div className="q4">{item.totalPrice}</div>
                                    <div className={item.status == "Paid" ? "text-green-400" : "text-orange-500"}>{item.status}</div>
                                </div><div className="border"></div></>)
                        })}
                    </div></div>}
        </div>

    )
}

export default Page