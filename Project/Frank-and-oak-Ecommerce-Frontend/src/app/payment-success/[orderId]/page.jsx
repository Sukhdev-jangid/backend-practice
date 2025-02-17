'use client'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const {orderId} = useParams();
  console.log(orderId)
  return (
    <div className='py-[200px]'>
        payment - success
    </div>
  )
}

export default page