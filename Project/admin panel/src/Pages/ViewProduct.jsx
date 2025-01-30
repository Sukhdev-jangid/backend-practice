import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ViewProduct = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  let [showShortDesc1, setShowShortDesc1] = useState(false);

    const [product, setProduct] = useState([]);
    const [filepath, setFilepath] = useState(null);

  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}products/read-product`)
      .then((response) => {
        setProduct(response.data.data);
        setFilepath(response.data.filepath)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
      fetchProducts();
    }, []);
  
    const handleupdateStatus = (e) => {
      const status = (e.target.textContent === 'Active') ? false : true;
      axios.put(`${process.env.REACT_APP_API_URL}products/update-status/${e.target.value}`, { status })
        .then((response) => {
          fetchProducts();
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

    const handledeleteproduct = (id) => {
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
          axios.delete(`${process.env.REACT_APP_API_URL}products/delete-product/${id}`)
            .then((response) => {
              fetchProducts();
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


  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex gap-[5px]">
                Delete{" "}
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
                />
              </th>
              <th>Sno</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>Thumbnail</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          <Tooltip id="my-tooltip" />
            {
              product.map((p,index)=>(
                <tr className="border-b">
                <td>
                  <input
                    type="checkbox"
                    id="delete"
                    name="delete"
                    className="input accent-[#5351c9] cursor"
                  />
                </td>
                <td>{index+1}</td>
                <td>{p.name}</td>
                <td className="w-[200px] p-2">
                  {p.description}{" "}
                  <span
                    className={
                      showDesc1 === false ? "font-bold cursor-pointer" : "hidden"
                    }
                    onClick={() => setShowDesc1(!showDesc1)}
                  >
                    ...Read
                  </span>
                  {showDesc1 === false ? (
                    ""
                  ) : (
                    <span>
                      {" "}
                      Ea explicabo minus doloribus asperiores! Suscipit illum,
                      assumenda nesciunt libero non ea quos consequatur vel.
                      Temporibus, nobis perspiciatis veritatis suscipit hic illum!
                    </span>
                  )}
                </td>
                <td className="w-[200px] p-2">
                  {p.shortDescription}{" "}
                  <span
                    className={
                      showShortDesc1 === false
                        ? "font-bold cursor-pointer"
                        : "hidden"
                    }
                    onClick={() => setShowShortDesc1(!showShortDesc1)}
                  >
                    ...Read
                  </span>
                  {showShortDesc1 === false ? (
                    ""
                  ) : (
                    <span>
                      {" "}
                      Ea explicabo minus doloribus asperiores! Suscipit illum,
                      assumenda nesciunt libero non ea quos consequatur vel.
                      Temporibus, nobis perspiciatis veritatis suscipit hic illum!
                    </span>
                  )}
                </td>
                <td className="object-contain">
                  <img
                    src={filepath + p.thumbnail}
                    alt="men's t-shirt"
                    width={80}
                    height={80}
                    className="rounded-[5px]"
                  />{" "}
                </td>
                <td>
                  <MdDelete onClick={() => handledeleteproduct(p._id)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  <Link to="/dashboard/products/update-product">
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td>
                <button
                      onClick={handleupdateStatus}
                      value={p._id}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={(p.status) ? "click to inactive" : "click to active"}
                      className={`${p.status ? 'bg-green-500' : 'bg-red-500'} rounded-md text-white py-2 w-[80px]`}>
                      {p.status ? "Active" : "Inactive"}
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

export default ViewProduct;
