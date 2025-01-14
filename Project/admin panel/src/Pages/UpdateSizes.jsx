import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSizes = () => {
  const { _id } = useParams();
  const [size, setsize] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    if (!_id) return;

    axios.get(`${process.env.REACT_APP_API_URL}size/read-updatesize/${_id}`)
      .then((response) => {
        setsize(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);

  const handleupdatesize = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}size/update-size/${_id}`, e.target)
      .then((response) => {
        // console.log(response);
        // return;
        let timerInterval;
        Swal.fire({
          title: "size added successfully!",
          html: "you will be redirect to view size page in <b></b> milliseconds.",
          timer: 800,
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
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleupdatesize}>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
              type="text"
              id="size"
              name="name"
              placeholder="Size Name"
              value={size.name}
              onChange={(e) => setsize({ ...size, name: e.target.value })}
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
                type="text"
                name="sizeorder"
                id="updated_size_order"
                placeholder="Size Order"
                value={size.sizeorder}
                onChange={(e) => setsize({ ...size, sizeorder: e.target.value })}
                className="w-full input rounded-[5px] p-2 border my-[10px]"
              />
            </div>
          </div>

          <div className="w-full my-[30px]">
            <button className=" rounded-[10px] bg-[#5351c9] border-none cursor-pointer text-white px-3  py-2">
              Update size
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
