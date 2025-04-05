"use client"
import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { BsBagPlus } from "react-icons/bs";
import Login from '../modals/Login';
import Cart from '../pages/cart/page';
import MobileSideBar from '../modals/MobileSideBar';
import Link from 'next/link';
import { MenMegaMenu, OurStoryMegaMenu, ThisJustInMegaMenu, WomenMegaMenu } from './MegaMenu';
import TextSlider from './TextSlider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParentCategories } from '../redux/slices/parentCategorySlice';
import Cookies from 'js-cookie';
import { setLogin, setLogOut } from '../redux/slices/userSlice';
import axios from 'axios';
import { readCart } from '../redux/slices/cartSlice';
export default function Header() {
  let [loginStatus, setLoginStatus] = useState(false)
  let [cartStatus, setCartStatus] = useState(false)
  let [menuHover, setMenuHover] = useState(0)
  let [sidebarStatus, setSidebarStatus] = useState(false);
  const [totalItems, settotalItems] = useState(null);

  const dispatch = useDispatch();
  const parentCategories = useSelector((state) => state.parentCategory.value);
  const user = useSelector(state => state.user.value);
  const cart = useSelector(state => state.cart.items)
  useEffect(() => {
    const auth = Cookies.get('auth-130');
    if (!auth) dispatch(setLogOut());

    axios.post(`http://localhost:4400/api/website/user/verify-user`, {}, {
      headers: {
        Authorization: 'Bearer ' + auth
      }
    })
      .then((response) => {
        dispatch(setLogin({
          loggedIn: true,
          data: response.data.data
        }));
        dispatch(readCart(response.data.data._id));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLogOut());
      })
  }, []);

  useEffect(() => {
    dispatch(fetchParentCategories());
  }, []);

  const handleLogOut = () => {
    dispatch(setLogOut());
    Cookies.remove('auth-130');
  }

  useEffect(() => {
    let total = 0;
    cart.map((cartItems,index)=>{
      total += cartItems.quantity;
    })
    settotalItems(total);
  }, [cart]);

  return (
    <div className='fixed top-0 z-[999999] w-full'>
      <TextSlider />
      <header className='shadow-md py-2 lg:py-1 px-2 sm:px-4 md:px-10 bg-white flex justify-between'>
        <div className='  flex gap-2 sm:gap-4 items-center  basis-[70%] md:basis-[20%] lg:basis-[15%]'>
          <RxHamburgerMenu onClick={() => setSidebarStatus(true)} className='sm:hidden block w-[22px] h-7' />
          <MobileSideBar sidebarStatus={sidebarStatus} />
          <Link href={"/"}>
            <span className='font-bold md:text-[18px] text-[15px]'>Arowai Streetwear</span>
          </Link>
        </div>
        <nav className=' basis-[30%] lg:basis-[84%] md:basis-[75%]  flex items-center justify-end lg:justify-between'>
          <div className='lg:block  hidden'>
            <ul className='flex gap-6 text-[15px] font-medium'>
              {
                parentCategories.map((category, index) => (
                  <li key={index} onMouseOver={() => setMenuHover(1)} onMouseOut={() => setMenuHover(0)} className='hover:bg-[#F9F9F9] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2 capitalize'>
                   <Link href={`/collections/${category.name}`}>
                      {category.name}
                    </Link>
                    <ThisJustInMegaMenu menuHover={menuHover} setMenuHover={setMenuHover} />
                  </li>
                ))
              }
              <li onMouseOver={() => setMenuHover(4)} onMouseOut={() => setMenuHover(0)} className='hover:bg-[#F9F9F9] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2'>Our Story
                <OurStoryMegaMenu menuHover={menuHover} setMenuHover={setMenuHover} />
              </li>
            </ul>
          </div>
          <ul className='flex gap-3 sm:gap-5'>
            {/* <li>
              <Link href={"/pages/search"}>
                <CiSearch className='sm:w-7 sm:h-7 h-5 w-5' />
              </Link>
            </li> */}
            {
              user.loggedIn ?
                (<button onClick={handleLogOut} className='bg-red-600 text-white font-bold px-2 py-1'>Log out</button>)
                :
                (
                  <li className='cursor-pointer' onClick={() => setLoginStatus(true)}>
                    <FaRegUserCircle className='sm:w-[22px]  sm:h-7 h-5 w-[18px] ' />
                    <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
                  </li>
                )
            }

            <li>
              {/* <Link href={"/user-dashboard/wishlist"}>
                <FaRegHeart className='sm:w-[22px] sm:h-7 h-5 w-[18px] cursor-pointer' />
              </Link> */}
            </li>
            {
              user.loggedIn ?
                (
                  <li className='cursor-pointer relative' >
                    <BsBagPlus className='sm:w-[22px] sm:h-7 h-5 w-[18px]' onClick={() => setCartStatus(true)} />
                    <div className='absolute top-[-10px] right-[-10px] text-[12px] font-bold'>{totalItems}</div>
                    <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
                  </li>
                )
                :
                ('')
            }

          </ul>
        </nav>
      </header>
    </div>
  )
}


