import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Swal from "sweetalert2";



const AddProduct = () => {

  const [preview, setPreview] = useState({ gallery: [] });
  const [categories, setCategories] = useState([]);
  const [productCategoies, setProductCategories] = useState([]);
  const [sizes,setSizes] = useState([]);
  const [colors,setColors] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColor, setSelectedColors] = useState(null);

  const fetchcategoies = () => {
    axios.get(`${process.env.REACT_APP_API_URL}parent-category/active-category`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProductcategoies = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}product-category/categories-by-parent/${id}`)
      .then((response) => {
        setProductCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchColors = () => {
    axios.get(`${process.env.REACT_APP_API_URL}color/active-colors`)
      .then((response) => {
        const newArr = response.data.data.map((color, index) => (
          { ...color, value: color._id, label: color.name }
        ));
        setColors(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSizes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}size/active-sizes`)
      .then((response) => {
        const newArr = response.data.data.map((size, index) => (
          { ...size, value: size._id, label: size.name }
        ));
        setSizes(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchcategoies();
    fetchColors();
    fetchSizes();
  }, []);

  const handlePreview = (e) => {

    const { name, files } = e.target;

    if (files[0]) {
      if (name === 'gallery') {
        const fileData = Array.from(files).map((file) => URL.createObjectURL(file))
        setPreview({ ...preview, [name]: fileData });
        return;
      }
      setPreview({ ...preview, [name]: URL.createObjectURL(files[0]) });
    }
  };

const nav = useNavigate();

  const handleAddProduct = (e)=>{
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}products/add-product`, e.target)
    .then((response) => {
      let timerInterval;
       Swal.fire({
                title: "product added successfully!",
                html: "you will be redirect to view size page in <b></b> milliseconds.",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  nav('/dashboard/products/view-product')
                }
              });
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form onSubmit={handleAddProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="description"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="shortDescription"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="thumbnail"
              onChange={handlePreview}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
            {
              preview.thumbnail && <img src={preview.thumbnail} alt="preview" className="w-[150px] my-10" />
            }
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="secondaryThumbnail"
              onChange={handlePreview}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
            {
              preview.secondaryThumbnail && <img src={preview.secondaryThumbnail} alt="preview" className="w-[150px] my-10" />
            }
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="gallery"
              multiple
              onChange={handlePreview}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
            {
              <div className="grid grid-cols-8 gap-2">
                {
                  preview.gallery && preview.gallery.map((img, index) => (
                    <img src={img} key={index} alt="preview" className="w-[150px] my-10" />
                  ))
                }
              </div>
            }
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              onChange={(e) => fetchProductcategoies(e.target.value)}
              name="parentCategory" id="" className="border w-full py-2 rounded-[5px] my-[10px] category input px-2 capitalize">
              <option value='default'>--select parent category--</option>
              {
                categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              name="productCategory" id="" className="border w-full py-2 rounded-[5px] my-[10px] category input px-2 capitalize">
              <option value='default'>--select product category--</option>
              {
                productCategoies.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Size
              </label>
              <Select
                name="sizes"
                isMulti
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={sizes}
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Color
              </label>
              <Select
                name="colors"
                isMulti
                defaultValue={selectedColor}
                onChange={setSelectedColors}
                options={colors}
              />
            </div>
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value={true}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value={false}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
