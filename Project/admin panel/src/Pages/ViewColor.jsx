import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Tooltip } from 'react-tooltip';

const ViewColor = () => {

  const [colour,setColour] = useState([]);

  const fetchcolors = () => {
    axios.get('http://localhost:4400/api/admin-panel/color/read-colors')
      .then((response) => {
        setColour(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    fetchcolors();
  }, []);

  const handleupdatestatus = (e) =>{
    const status = (e.target.textContent === 'Active') ? false : true;
 
    axios.put(`http://localhost:4400/api/admin-panel/color/update-status/${e.target.value}`, { status })
      .then((response) => {
     
        fetchcolors();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handledeletecolor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4400/api/admin-panel/color/delete-color/${id}`)
        .then((response) => {
          fetchcolors();
        })
        .catch((error) => {
          console.log(error);
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }

  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]">
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="my-tooltip" />
            {
              colour.map((c,index)=>(
                <tr className="border-b">
                <td className="p-2">
                  <input
                    type="checkbox"
                    name="delete"
                    className="cursor-pointer accent-[#5351c9] input"
                  />
                </td>
                <td className="p-2">{index+1}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">
                  <div className="w-[90%] mx-auto h-[20px] bg-red-500 border">{c.code}</div>
                </td>
                <td className="p-2">
                  <MdDelete onClick={()=>handledeletecolor(c._id)}  className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  <Link to="/dashboard/color/update-colors">
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td className="p-2">
                <button
                      onClick={handleupdatestatus}
                      value={c._id}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={(c.status) ? "click to inactive" : "click to active"}
                      className={`py-[4px] w-[60px] rounded-sm  ${(c.status) ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {(c.status) ? "Active" : "Inactive"}
                    </button>
                </td>
              </tr>
              ))
            }
            

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
