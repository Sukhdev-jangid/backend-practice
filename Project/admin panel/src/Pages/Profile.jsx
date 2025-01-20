import React, { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile() {
  const nav = useNavigate();
  const [admin, setAdmin] = useState({});
  const [filepath, setFilepath] = useState('');
  const [preview, setPreview] = useState({});
  const [ifEmail, setIfEmail] = useState(false);
  const [ifOtpSent, setOtpSent] = useState(false);
  const [Otpbtn, setOtpBtn] = useState('Genrate OTP');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let data = sessionStorage.getItem('admin');

    if (!data) return nav('/');
    data = JSON.parse(data);
    setAdmin(data.data);
    setFilepath(data.filepath);
  }, []);

  const handlePreview = (e) => {
    const { files, name } = e.target;
    if (files[0]) {
      setPreview({ ...preview, [name]: URL.createObjectURL(files[0]) });
    }
  };

  const handleupdateAdmin = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}admin/update-admin/${admin._id}`, e.target)
      .then(res => {
        alert("success");
        sessionStorage.removeItem('admin');
        nav('/');
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleGenrateOtp = () => {

    setLoader(true);

    axios.post(`${process.env.REACT_APP_API_URL}admin/genrate-otp`)
      .then(res => {
        console.log(res.data);
        let counter = 120;
        setOtpSent(true);
        setOtpBtn('Resent OTP in 120s')

        const otpInterval = setInterval(() => {
          counter--;
          setOtpBtn(`Resent OTP in ${counter}s`)
          if (counter === 0) {
            clearInterval(otpInterval);
            setOtpSent(false);
            setOtpBtn('Genrate OTP');
          }
        }, 1000);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateEmail=(e)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}admin/update-creadintials`, e.target)
    .then(res => {
      alert("success");
      sessionStorage.removeItem('admin');
      nav('/');
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <div className="fixed w-[100vw] h-[100vh] left-0 top-0 z-[99]" style={{
        display: (loader) ? '' : 'none'
      }}></div>
      <div class="loader fixed z-[999] top-[50%] left-[50%]" style={{
        display: (loader) ? '' : 'none'
      }}></div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form method="post" onSubmit={handleupdateAdmin}>
              <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px]">
                <div className="border border-slate-300 w-[150px] h-[150px] rounded-[50%] object-contain">
                  <img
                    src={preview.thumbnail || filepath + admin.thumbnail}
                    alt="profile img"
                    className="w-full h-full rounded-[50%]"
                  />
                </div>
                <span className="block text-center">Profile Image</span>
                <input
                  type="file"
                  name="thumbnail"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  type="text"
                  value={admin.name}
                  name="name"
                  onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    value={admin.facebook}
                    name="facebook"
                    onChange={(e) => setAdmin({ ...admin, facebook: e.target.value })}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    value={admin.instagram}
                    name="instagram"
                    onChange={(e) => setAdmin({ ...admin, instagram: e.target.value })}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    type="text"
                    value={admin.youtube}
                    name="youtube"
                    onChange={(e) => setAdmin({ ...admin, youtube: e.target.value })}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    type="text"
                    value={admin.twitter}
                    name="twitter"
                    onChange={(e) => setAdmin({ ...admin, twitter: e.target.value })}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img src={preview.logo || filepath + admin.logo} alt="Logo" className="w-full h-full" />
                </div>
                <input
                  type="file"
                  name="logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={preview.favicon || filepath + admin.favicon}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="favicon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={preview.footer_logo || filepath + admin.footer_logo}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>

              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email or Password
        </span>
        <div className="w-full p-[30px]">
          <form method="post" onSubmit={handleUpdateEmail}>
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                value={admin.email}
                name='email'
                readOnly
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div className={`w-full mb-[10px] ${(ifOtpSent) ? 'block' : 'hidden'}`}>
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name='userotp'
                className="w-full border h-[35px] rounded-[5px] p-2 input mb-2"
              />
              <input
                type="text"
                placeholder="Enter new Password"
                name='newpassword'
                className="w-full border h-[35px] rounded-[5px] p-2 input mb-2"
              />
              {
                ifEmail
                &&
                <input
                  type="text"
                  placeholder="Enter new email"
                  name='newemail'
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              }
              <button
                type="button"
                onClick={() => setIfEmail(!ifEmail)}
                className={`py-2 px-3 text-[12px] font-bold rounded-md text-white bg-[#5351c9]  my-[30px]`}>
                {
                  (ifEmail) ? 'Update only password' : 'Update Email Too'
                }
              </button>
            </div>
            <button
              type="button"
              onClick={handleGenrateOtp}
              disabled={ifOtpSent}
              className={`w-[150px] h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
              {Otpbtn}
            </button>

            <button
              type="submit"

              className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9] ${(ifOtpSent) ? 'block' : 'hidden'}  my-[30px]`}>
              Update Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
