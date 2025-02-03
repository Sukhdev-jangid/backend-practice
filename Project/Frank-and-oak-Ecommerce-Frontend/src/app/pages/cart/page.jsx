"use client"
import { BsArrowLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, readCart, updateCart } from "@/app/redux/slices/cartSlice";
import { useEffect, useState } from "react";
export default function Cart({ cartStatus, setCartStatus }) {

  const [totalItems, settotalItems] = useState(null);
  const [totalAmt, setTotalAmt] = useState(null);

  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    let total = 0;
    let amt = 0;
    cart.map((cartItems, index) => {
      total += cartItems.quantity;
      amt += cartItems.quantity * cartItems.product.price;
    })
    settotalItems(total);
    setTotalAmt(amt);
  }, [cart]);

  return (
    <>
      <section className={`${cartStatus ? "opacity-100 visible" : "opacity-0 invisible"} duration-500`}>
        <div className="bg-[rgba(0,0,0,0.6)] border border-red-700 fixed top-0 z-[9999999] w-full min-h-screen">
          <div className='lg:w-[38%] w-full  fixed top-0 right-0 z-[999999] bg-white'>
            <div onClick={() => setCartStatus(!cartStatus)} className='py-3 px-6 flex items-center gap-2 bg-[#F9F9F9] cursor-pointer'>
              <BsArrowLeft className='font-bold' />
              <div className='text-sm font-semibold'>Contine Shopping</div>
            </div>
            <div className=' bg-black text-white text-[12px] text-center font-bold py-1.5'>Free shipping on orders $99+ and free returns</div>
            <div className='md:px-8 px-4 lg:h-screen h-full overflow-y-scroll pb-[210px]'>
              {
                cart.map((cartItem, index) => (
                  <CartProducts key={index} cartItem={cartItem} />
                ))
              }

            </div>
            <div className="sticky bottom-0 px-8 bg-[#f9f9f9] py-4">
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold">Subtotal <span className="text-[14px] font-semibold text-customGray">({totalItems} items)</span></div>
                <div className="text-[18px] font-semibold">₹ {totalAmt}</div>
              </div>
              <Link href="/checkouts">
                <button onClick={()=>{setCartStatus(false)}} className="text-[20px] hover:shadow-[5px_5px_0px_0px_#DDD] font-semibold flex justify-center items-center gap-2 text-white bg-black p-3 w-full mt-5">Secure Checkout <IoLockClosedOutline size={20} /></button>
              </Link>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CartProducts({ cartItem }) {
  const filepath = useSelector(state => state.cart.filepath);
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  const handlupdateCart = async (e) => {
    const quantity = (e.target.textContent === '+') ? cartItem.quantity + 1 : cartItem.quantity - 1;
    await dispatch(updateCart({
      id: cartItem._id,
      quantity
    }));
    dispatch(readCart(user.data._id));
  }

  const handldeleteCart = async () => {
    await dispatch(deleteCart(cartItem._id));
    dispatch(readCart(user.data._id));
  }



  return (
    <div className='grid grid-cols-[25%_auto] gap-3 py-5 border-b border-customBorder'>
      <img className='w-full' src={filepath + cartItem.product.thumbnail} alt="" />
      <div className='flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <h5 className='text-sm font-semibold'>{cartItem.product.name}</h5>
            <MdClose size={20} onClick={handldeleteCart} />
          </div>
          <div className='font-semibold text-[12px] text-customGray'>Size: {cartItem.size.name}</div>
          <div className='text-[12px] mt-1.5 text-customGray font-medium flex items-center gap-1 underline underline-offset-2'>Move to Wishlist <CiHeart size={16} /></div>
        </div>
        <div className='flex items-center justify-between'>
          <div className=''>
            <button
              onClick={handlupdateCart}
              value={cartItem._id}
              disabled={cartItem.quantity < 2}
              className='px-2.5 py-0.5 text--[20px] border border-customBorder'>-</button>
            <button className='px-2.5 py-0.5 border border-customBorder'>{cartItem.quantity}</button>
            <button onClick={handlupdateCart} value={cartItem._id} className='px-2.5 py-0.5 text--[20px] border border-customBorder'>+</button>
          </div>
          <div className='text-[15px] font-semibold'>
            <span className="text-[12px]">{cartItem.product.price} X {cartItem.quantity} = </span>
            <span>{cartItem.product.price * cartItem.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
