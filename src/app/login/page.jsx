"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Loading from '../../components/Loading'
import Link from 'next/link'
const verify = async () => {
  const token = localStorage.getItem("user")
  console.log("verifying...");

  const res = await fetch(`/api/users/verify`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
  });
  const d = await res.json();
  if (d.success === true) {
    return true;
  }
  else {
    return false;
  }

}
const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const first = async () => {
    let data = await verify();
    setLoading(false)
    if (data) {
      window.location.href = "/profile"
    }
  }
  useEffect(() => {
    first()
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    const res = await fetch(`/api/users/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const d = await res.json();
    if (d.success === true) {
      localStorage.setItem("user", d.token);
      console.log("succcesss mfsw");
      // console.log(d.user);
      localStorage.setItem("userdata", JSON.stringify(d.user));
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
      setEmail("");
      setPassword("");
    }
    else {
      console.log("Oh SHit");

    }

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
          <div className="text-6xl font-bold pb-5">Login</div>
        </div>
        <div className="img mt-10">
          <Image height={400} width={400} alt="" src="/contact.png"></Image>
        </div>
      </div>
      <div className="main flex justify-center my-12 mx-16">
        <div className="reg rounded-xl shadow-xl  w-1/4 mr-10">
          <div className="heading bg-orange-600  text-white text-center font-bold rounded-t-xl text-2xl p-2">REGISTERED CUSTOMERS</div>
          <div className="body p-2">
            If you have an account, sign in with your email address.
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 p-6">
              <label htmlFor="email" className="block mb-2  text-gray-900 font-bold text-base">Enter your Email</label>
              <input type="email" id="email" name="email" value={email} onChange={handleChange} autoComplete='email' placeholder="email address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
            </div>
            <div className="mb-6 p-6">
              <label htmlFor="password" className="block mb-2 text-base font-bold text-gray-900 " >Enter your Password</label>
              <input type="password" id="password" name='password' value={password} onChange={handleChange} autoComplete='current-password' placeholder='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
            </div>
            <div className="btn p-6">
              <button type="submit" className="text-white items-center  bg-orange-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Log In</button></div>
          </form>

        </div>
        <div className="reg rounded-lg border ml-10 shadow-xl w-1/4">
          <div className="heading bg-orange-600  text-white text-center font-bold  rounded-t-xl text-2xl p-2">NEW CUSTOMERS</div>
          <div className="body p-2">
            Creating an account has many benefits: check out faster, keep more than one address, track orders and more.
          </div>


          <div className="btn p-6">
            <Link href="/register">
              <button type="submit" className="text-white bg-orange-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" >Create Account</button></Link>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Login