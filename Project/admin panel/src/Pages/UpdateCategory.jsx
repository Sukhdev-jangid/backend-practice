import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCategory = () => {

  const {_id} = useParams();
  const [category,setCategory] = useState({});
  const nav = useNavigate();

  useEffect(()=>{
    if(!_id) return;
    axios.get(`http://localhost:4400/api/admin-panel/parent-category/read-category/${_id}`)
    .then((response)=>{
        setCategory(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[_id]);

  const handleUpdatecategory = (e)=>{
      e.preventDefault();
      axios.put(`http://localhost:4400/api/admin-panel/parent-category/update-category/${_id}`,e.target)
      .then((response)=>{
           let timerInterval;
                  Swal.fire({
                    title: "categouy added successfully!",
                    html: "you will be redirect to view category page in <b></b> milliseconds.",
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
                     nav('/dashboard/category/view-category')
                    }
                  });
      })
      .catch((error)=>{
        console.log(error);
      });
  };
 
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdatecategory} >
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={(e)=> setCategory({ ...category, name:e.target.value})}
              id="categoryName"
              placeholder="Category Name"
              
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          {/* <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="categoryImg"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div> */}
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              value={category.description}
              onChange={(e)=> setCategory({ ...category, description:e.target.value})}
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          {/* <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="0"
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="1"
              checked
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div> */}
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white px-3 h-[35px]">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
