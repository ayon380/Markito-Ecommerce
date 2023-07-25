"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Image from 'next/image'
const verify = async () => {
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

const Page = () => {
    const [user, setUser] = useState(null)
    const [blog, setblog] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const first = async () => {
            const us = await verify();
            if (us == null) {
                router.push('/')
            }
            const token = localStorage.getItem("user")
            try {
                const res = await fetch('api/blogs/user', {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }),
                });
                const as = await res.json();
                // console.log(as.bg[0);
                setblog(as.bg);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }

            if (us) {
                setUser(us);
            }
        }
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
    const edit = async () => {
        const token = localStorage.getItem("user")
        console.log("ASdasas");
        let qe;
        try {
            const res = await fetch('/api/users/edit', {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(user)
            })
            qe = await res.json()
        }
        catch (error) {
            console.log(error);
            return;
        }
        console.log(qe + "hjhj");
        if (qe.success) {
            setUser(qe.q)
            localStorage.setItem("userdata", JSON.stringify(qe.q))
            console.log("Edited Successfully");
        }
        else {
            console.log("Error");
        }
    }
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("userdata")
        window.location.href = "/"
    };
    // const { email } = user
    const handleEdit = async (event) => {
        event.preventDefault();
        await edit();
    };

    return (
        <div>
            <div
                className={`transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none hidden"
                    }`}
            >..
                <Loading />
            </div>
            <div className="flex justify-between px-96 bg-red-50">
                <div className="mainhead pt-28 pb-36 " >
                    <div className="text-6xl font-bold pb-5">Profile</div>
                </div>
                <div className="img">
                    <Image width={400} height={400} alt="." src="/contact.png"></Image>
                </div>
            </div>
            <form onSubmit={handleEdit}>
                {user && (
                    <div className="max-w-md my-5 mx-auto p-4 bg-white shadow-lg rounded-lg">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                                First Name:
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                value={user.firstName}
                                type="firstName"
                                onChange={handleChange}
                                autoComplete="firstName"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                                Last Name:
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                value={user.lastName}
                                type="text"
                                onChange={handleChange}
                                autoComplete="lastName"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your last name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dp" className="block text-gray-700 font-bold mb-2">
                                Display Picture URL:
                            </label>
                            <input
                                id="dp"
                                name="dp"
                                value={user.dp}
                                type="text"
                                onChange={handleChange}
                                autoComplete="dp"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your display picture URL"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                Address:
                            </label>
                            <input
                                id="address"
                                name="address"
                                value={user.address}
                                type="text"
                                onChange={handleChange}
                                autoComplete="address"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                                City:
                            </label>
                            <input
                                id="city"
                                name="city"
                                value={user.city}
                                type="text"
                                onChange={handleChange}
                                autoComplete="city"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your city"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                                State:
                            </label>
                            <input
                                id="state"
                                name="state"
                                value={user.state}
                                type="text"
                                onChange={handleChange}
                                autoComplete="state"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your state"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="zipCode" className="block text-gray-700 font-bold mb-2">
                                Zip Code:
                            </label>
                            <input
                                id="zipCode"
                                name="zipCode"
                                value={user.zipCode}
                                type="text"
                                onChange={handleChange}
                                autoComplete="zipCode"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your zip code"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                                Phone:
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                value={user.phone}
                                type="text"
                                onChange={handleChange}
                                autoComplete="phone"
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Edit
                        </button>
                    </div>
                )}
            </form>
            {blog && <div className="flex justify-center">
                <div className="logout flex justify-center">
                    {blog.map((b) => {
                        return (<div key={b.title} className="bg-gray-100 rounded-md p-3 text-black hover:bg-gray-200">
                            <div className="text-2xl font-bold pb-5">{b.title}</div>
                            <div className="text-xl font-bold pb-5">{b.description}</div>
                            <div className="text-xl font-bold pb-5">{b.content}</div>
                        </div>)
                    })}
                </div>
            </div>}

            <div className="flex justify-center">
                <div className="logout flex justify-center my-10">
                    <button onClick={logout} className='bg-orange-500  rounded-md p-3 mr-20 text-white hover:bg-orange-700'>Logout</button>
                    <button onClick={()=>router.push('/orderhistory')} className='bg-orange-500  rounded-md p-3 text-white hover:bg-orange-700'>Order History</button>
                </div>
            </div>
        </div>)
}

export default Page;