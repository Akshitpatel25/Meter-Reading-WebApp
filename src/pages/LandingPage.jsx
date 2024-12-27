import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/meter-reading-management-1.png";
import { useUser } from "../appwrite/users";

function LandingPage() {
  const navigate = useNavigate();
  const user = useUser();
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    if (user.current) {
      navigate("/home");
      setisloading(true);
    }else {
      setisloading(false);
    }
  },);

  return (
    <div className="w-screen h-screen bg-black text-white">
      <div className="w-full h-1/6 bg-yellow-500 flex ">
        <Link className="w-1/2 h-full flex items-center outline-none">
          <img className="w-19 h-full" src={logo} alt="" />
          <h1 className="text-3xl font-bold text-slate-800  max-450:text-md ">
            Meter Reading
          </h1>
        </Link>
      </div>

      <div className="w-full h-5/6 flex justify-center items-center gap-x-2 ">
        {!isloading ? (
          <>
            <button
              className="p-3 bg-yellow-500 text-black text-2xl font-bold rounded-lg"
              onClick={() => navigate("/login")}
            >
              login
            </button>
            <button
              className="p-3 border text-2xl font-bold rounded-lg"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <img src="/public/ZKZg.gif" alt="" className="w-10 h-10" />
        )}
      </div>
    </div>
  );
}

export default LandingPage;
