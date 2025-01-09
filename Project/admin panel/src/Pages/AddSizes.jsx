import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AddSizes = () => {

  const nav = useNavigate();
  const handlesize = (e) =>{
      e.preventDefault();

      axios.post('http://localhost:4400/api/admin-panel/size/insert-size',e.target)
      .then((response)=>{
            let timerInterval;
                  Swal.fire({
                    title: "size added successfully!",
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
                     nav('/dashboard/size/view-sizes')
                    }
                  });
      })
      .catch((error)=>{
        if (error.status === 400) {
                  Swal.fire({
                    title: "The size?",
                    text: "The size already exist?",
                    icon: "question"
                  });
                }
        console.log(error);
         Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  footer: '<a href="#">Why do I have this issue?</a>'
                });
      })
  }

  return (
    <div className="w-[90%] my-[150px] mx-auto bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-[#303640]">
        Add Size
      </span>
      <form method="post" onSubmit={handlesize}>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Name
          </label>
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Size Name"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Order
          </label>
          <input
            type="text"
            name="sizeorder"
            id="size_order"
            placeholder="Size Order"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2] mr-[30px]">
            Display
          </label>
          <input
            type="radio"
            name="status"
            id="size"
            value="true"
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9]"
          />
          <span>Display</span>
          <input
            type="radio"
            name="status"
            id="size"
            value="false"
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9]"
            checked
          />
          <span>Hide</span>
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
            Add Size
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSizes;
