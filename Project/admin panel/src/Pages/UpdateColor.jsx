import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateColor = () => {
  const setImage = () => {
    let imageFileInput = document.querySelector("#image_src");
    let imagePreview = document.querySelector("#image_preview");
    let colorCode = document.querySelector("#color_code");
    let color_picker = document.querySelector("#color_picker");
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0];
      console.log(file);
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = this.result;
      });
      reader.readAsDataURL(file);

      const colorPicker = new window.EyeDropper();
      const colorSelector = document.querySelector("#colorPicker");
      colorSelector.addEventListener("click", () => {
        colorPicker
          .open()
          .then((res) => {
            colorCode.value = res.sRGBHex;
            color_picker.value = res.sRGBHex;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const { _id } = useParams();

  const [Color, setColor] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    if (!_id) return;

    axios.get(`http://localhost:4400/api/admin-panel/color/read-color/${_id}`)
      .then((response) => {
        setColor(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [_id]);

  const handleupdatecolor = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.color.value,
      code: e.target.code.value
    }
    axios.put(`http://localhost:4400/api/admin-panel/color/update-color/${_id}`,data)
    .then((response) => {
           let timerInterval;
              Swal.fire({
                title: "color added successfully!",
                html: "you will be redirect to view color page in <b></b> milliseconds.",
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
                  nav('/dashboard/color/view-colors')
                }
              });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
      <div className="bg-[#f8f8f9] h-[50px] header w-full p-[12px] rounded-[10px_10px_0_0]">
        Update Colors
      </div>
     <form method="post" onSubmit={handleupdatecolor}>
     <div className="w-full p-[20px]">
        <label htmlFor="color">Color Name</label> <br />
        <input
          type="text"
          name="color"
          id="color"
          className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
          placeholder="Color Name"
          value={Color.name}
          onChange={(e) => setColor({ ...Color, name: e.target.value })}
        />
        <label htmlFor="code">Color Code</label> <br />
        <input
          type="text"
          name="code"
          id="color_code"
          className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
          placeholder="Color Code"
          value={Color.code}
          onChange={(e) => setColor({ ...Color, code: e.target.value })}
        />
        <label htmlFor="color">Color Picker</label> <br />
        <input
          type="color"
          name="color_picker"
          id="color_picker"
          className="focus:outline-none border my-[10px] rounded-[5px]"
        />
        <div className="w-[300px] my-[10px]">
          {/* <ColorPicker color={color} onChange={setColor} height={200} /> */}
          <span className="w-full h-[200px] object-contain my-[10px]">
            <img
              src=""
              alt="Select product"
              id="image_preview"
              width={300}
              height={200}
            />
          </span>
          <input
            type="file"
            name="image"
            id="image_src"
            className="category w-full border input rounded-[5px]"
            onClick={() => setImage()}
          />
          <span
            id="colorPicker"
            className="w-[100px] bg-[#5351c9] text-white cursor-pointer h-[30px] text-center rounded-[5px] box-border my-[30px] block border"
          >
            Pick Color
          </span>
        </div>
        <button className="bg-[#5351C9] text-white rounded-[5px]  w-[120px] h-[40px]">
          update Color
        </button>
      </div>
     </form>
    </div>
  );
};

export default UpdateColor;
