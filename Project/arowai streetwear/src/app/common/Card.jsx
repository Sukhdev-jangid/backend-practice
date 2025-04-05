"use client"

import { useEffect, useState } from "react"
import { QuickAddButton } from "../HomeComponents/ThisJustIn"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, readCart } from "../redux/slices/cartSlice";

export function Card({product,filepath}) {

    let [quickAdd,setQuickAdd]=useState(false)
    const [selectedColor,setSelectedColor]=useState('');
    const [showsizes,setShowsizes]=useState(false);

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user.value);
    
    useEffect(()=>{
        setSelectedColor(product.colors[0]._id);
    },[product]);

    const handlAddtoCart = async(e) =>{
      if(!user.loggedIn) alert('please sign IN');

      const data ={
        product:product._id,
        user:user.data._id,
        color:selectedColor,
        size:e.target.value
      }
      await dispatch(addToCart(data));
      dispatch(readCart(user.data._id));
      // console.log(data)
    }
  return (
    <div className='cursor-pointer group'>
                <div className=' w-full h-full'>
                    <div className='group relative'>
                    <span className='bg-black text-white absolute right-2 top-2 z-[9999] text-[8px] sm:text-[10px] font-medium uppercase px-0.5 sm:px-1 py-0.5'>few left</span>
                    <img className='h-full w-full object-cover' src={filepath + product.thumbnail} alt="Womens Denim" />
                    <img className='h-full w-full duration-300 z-[999] absolute top-0 group-hover:block hidden object-cover' src={filepath+product.secondaryThumbnail} alt="Womens Denim" />
                    <button 
                    onMouseEnter={()=>setShowsizes(true)} onMouseLeave={()=>setShowsizes(false)}
                    onClick={()=>setQuickAdd(true)} className={`${setQuickAdd ? <QuickAddButton/> : ""} w-[95%] text-center box-border bg-white py-3 text-[14px] font-medium absolute bottom-2 translate-x-[-50%] left-[50%]  group-hover:block hidden z-[9999]`}>Quick Add
                    <div className={`absolute w-full h-full left-0 top-0 ${showsizes?'grid':'hidden'} grid-cols-5 `}>
                      {
                        product.sizes.map((size,index)=>(
                          <button 
                          value={size._id}
                          onClick={handlAddtoCart} key={index} className="bg-white uppercase p-2 hover:bg-black hover:text-white">{size.name}</button>
                        ))
                      }
                    </div>
                    </button>
                    </div>
                <h5 className='sm:text-[14px] text-[12px] flex gap-3 mt-2 font-semibold'>{product.name}
                    <span className=' rounded-full hover:bg-[#EBECEE] h-7 w-7 p-1'>
                <svg className='sm:w-5 sm:h-5 h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3666 3.84123C16.941 3.4154 16.4356 3.07761 15.8794 2.84714C15.3232 2.61667 14.727 2.49805 14.1249 2.49805C13.5229 2.49805 12.9267 2.61667 12.3705 2.84714C11.8143 3.07761 11.3089 3.4154 10.8833 3.84123L9.99994 4.72457L9.1166 3.84123C8.25686 2.98149 7.0908 2.49849 5.87494 2.49849C4.65907 2.49849 3.49301 2.98149 2.63327 3.84123C1.77353 4.70098 1.29053 5.86704 1.29053 7.0829C1.29053 8.29876 1.77353 9.46482 2.63327 10.3246L3.5166 11.2079L9.99994 17.6912L16.4833 11.2079L17.3666 10.3246C17.7924 9.89894 18.1302 9.39358 18.3607 8.83736C18.5912 8.28115 18.7098 7.68497 18.7098 7.0829C18.7098 6.48083 18.5912 5.88465 18.3607 5.32844C18.1302 4.77222 17.7924 4.26686 17.3666 3.84123Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </span>
                </h5>
                <div className='sm:text-[14px] text-[13px] font-medium mt-1 sm:mt-3'>
                  <span className="line-through">₹{product.mrp}</span>
                  <span className="text-red-600 ms-4">₹{product.price}</span>
                </div>
                <span className='group-hover:hidden sm:text-[16px] text-[12px] block'>{product.colors.length} color</span>
                <div className='group-hover:block hidden mt-1'>
                <div className="grid grid-cols-10" >
                  {
                    product.colors.map((color,index)=>(
                      <div key={index} 
                      onClick={()=>setSelectedColor(color._id)}
                      style={{
                        backgroundColor:color.code,
                        boxShadow:(selectedColor===color._id)?'0 0 1px 4px black':''
                      }}
                      className='sm:w-5 sm:h-5 h-3 w-3 rounded-full border border-black flex items-center justify-center'></div>
                    ))
                  }
                </div>
                </div>
                </div>
            </div>
  )
}
