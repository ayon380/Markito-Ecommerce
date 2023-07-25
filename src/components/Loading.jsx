import React from 'react'
import Image from 'next/image'
const Loading = () => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-white  z-50 `}>
            <Image src="/Loading.gif" alt='GIF' height={200} width={200} />
        </div>
    )
}

export default Loading