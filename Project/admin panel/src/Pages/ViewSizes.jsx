import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";


const ViewSizes = () => {

  const [sizes,setSizes] = useState([]);
  const [checkedsize,setcheckedsize] = useState([]);
  const [ifAllchecked,setifAllChecked] = useState(false);
  
  const fetchsize = () =>{
    axios.get('http://localhost:4400/api/admin-panel/size/read-size')
    .then((response)=>{
        setSizes(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  useEffect(()=>{
    fetchsize();
  },[]);

  const handledeletesize = (id) => {
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
        axios.delete(`http://localhost:4400/api/admin-panel/size/delete-size/${id}`)
        .then((response) => {
          fetchsize();
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

  };

  const handleupdateStatus = (e) =>{
    const status = (e.target.textContent === 'Active') ? false : true;
    axios.put(`http://localhost:4400/api/admin-panel/size/update-status/${e.target.value}`, { status })
      .then((response) => {
        fetchsize();
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

  const handlechecksize = (e) =>{
      const {checked,value} = e.target;
      if(checked){
        setcheckedsize([...checkedsize,value]);
      }
      else{
       setcheckedsize(checkedsize.filter((size)=> size !== value));
      }
  };

  const handledeletesizes = (e) =>{
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
        axios.post(`http://localhost:4400/api/admin-panel/size/delete-sizes`,{ids:checkedsize})
        .then((response) => {
          fetchsize();
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
  };

  const handlecheckAllsize = (e) =>{
      const {checked} = e.target;
      if(checked){
        setcheckedsize(sizes.map((size)=>size._id));
        setifAllChecked(true);
      }
      else{
        setcheckedsize([]);
        setifAllChecked(false);
      }
  };

  useEffect(()=>{
    setifAllChecked(sizes.length === checkedsize.length && sizes.length !== 0);
  },[sizes,checkedsize]);

  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
              <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handledeletesizes}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  onClick={handlecheckAllsize}
                  className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                  checked={ifAllchecked}
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          <Tooltip id="my-tooltip" />
            {
              sizes.map((s,index)=>(
                <tr className="border-b">
                <td>
                  <input
                    type="checkbox"
                    name="delete"
                    value={s._id}
                    onClick={handlechecksize}
                    checked={checkedsize.includes(s._id)}
                    className="accent-[#5351c9] cursor-pointer input"
                  />
                </td>
                <td>{index+1}</td>
                <td>{s.name}</td>
                <td>{s.sizeorder}</td>
                <td className="flex gap-[5px]">
                  <MdDelete  onClick={()=>handledeletesize(s._id)}  className="my-[5px] text-red-500 cursor-pointer" /> |{" "}
                  <Link to={`/dashboard/sizes/update-size/${s._id}`}>
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                  </Link>
                </td>
                <td>
                <button
                      onClick={handleupdateStatus}
                      value={s._id}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={(s.status)?"click to inactive":"click to active"}
                      className={`py-[4px] w-[60px] rounded-sm  ${(s.status)?'bg-green-500':'bg-red-500'}`}
                    >
                      {(s.status)?"Active":"Inactive"}
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

export default ViewSizes;
