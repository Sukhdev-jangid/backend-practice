"use client"
import React, { useEffect, useState } from 'react'
import { FaRegSquareFull } from 'react-icons/fa6';
import { SiWindows11 } from "react-icons/si";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Header from '@/app/common/Header';
import { Card } from '@/app/common/Card';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByParent } from '@/app/redux/slices/productSlice';

export default function Category() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const parentCategories = useSelector(state => state.parentCategory.value);
    const productData = useSelector(state => state.products.value);
    let [settingGrid, setSettingGrid] = useState(false);
    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState('');

    useEffect(() => {
        if (parentCategories.length > 0) {
            // const indexNo = parentCategories.findIndex(parentCategory=>parentCategory.name===category)
            const id = parentCategories.find((parentCategory) => parentCategory.name === category)._id;
            dispatch(fetchProductByParent(id))

        }
    }, [category, parentCategories]);

    useEffect(() => {
        if (productData.data) {
            setProducts(productData.data);
            setFilepath(productData.filepath);
        }
    }, [productData]);

    return (
        <>
            <Header />
            <section className='grid lg:grid-cols-[17%_83%] md:grid-cols-[25%_75%] justify-between mt-[50px] md:px-5 px-0 pt-[30px]'>
                <CategorySidebar />
                <div className='sticky top-0 p-4 h-screen overflow-y-scroll catListScroll'>
                    <div className='w-full border-b border-gray-300 py-6 flex items-center md:justify-end justify-between'>
                        <div className='text-[14px] font-semibold flex gap-2 md:hidden '><svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" /></svg> Filters</div>
                        <div className='flex gap-2 justify-end'>
                            <SiWindows11 onClick={() => setSettingGrid(false)} className='text-white cursor-pointer bg-black border-2 hover:border-[#BFBFBF] hover:bg-[#BFBFBF] border-black w-6 h-6' />
                            <FaRegSquareFull onClick={() => setSettingGrid(true)} className='w-6 h-6 cursor-pointer text-gray-500 hover:text-[#BFBFBF]' />
                            <div className='flex items-center text-[14px] font-semibold gap-2 ms-5'>Sort by <MdOutlineKeyboardArrowDown /></div>
                        </div>
                    </div>
                    <div className='py-6'>
                        <div className='text-[20px] pb-5 font-medium'>New In</div>
                        <div className={`grid ${settingGrid ? "lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3" : "lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5"} duration-300`}>
                            {
                                products.map((product, index) => (
                                    <Card key={index} product={product} filepath={filepath} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export function CategorySidebar() {
    let [faqStatus, setFaqStatus] = useState(false)
    return (
        <aside className="h-screen md:block hidden">
            <div className="text-[13px] font-medium">
                {" "}
                <span className="underline underline-offset-2">Home</span> /{" "}
                <span className="underline underline-offset-2">Women</span>
            </div>
            <div className="text-[20px] pt-2 font-medium">New In</div>
            <div
                id="asideScrollBar"
                className="h-[90vh] pe-2 overflow-scroll overflow-x-hidden"
            >
               
                <div className="border-t border-gray-300 pt-6">
                    <h3 className="text-[14px] font-bold">Featured</h3>
                    <ul className="py-4 text-[13px] font-semibold space-y-2">
                        <li>New In</li>
                        <li>Best Sellers</li>
                        <li>Coming Soon</li>
                        <li>The Originals</li>
                        <li>Workwear</li>
                        <li>Sale</li>
                    </ul>
                    <h3 className="text-[14px] font-bold mt-5">Clothing</h3>
                    <ul className="py-4 text-[13px] font-semibold space-y-2">
                        <li>Shop All</li>
                        <li>T-shirts & Tops</li>
                        <li>Blouses & Shirts</li>
                        <li>Sweaters & Cardigans</li>
                        <li>Blazers & Overshirts</li>
                        <li>Sale</li>
                        <li>Denim</li>
                        <li>Pants</li>
                        <li>Dresses</li>
                    </ul>
                    <h3 className="text-[14px] font-bold mt-5">Accessories</h3>
                    <ul className="pt-4 text-[13px] font-semibold space-y-2">
                        <li>Shop All</li>
                        <li>T-shirts & Tops</li>
                        <li>Blouses & Shirts</li>
                        <li>Sweaters & Cardigans</li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}



