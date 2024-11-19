import React, { useEffect, useState } from "react";
import { useUser } from "../appwrite/users";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/meter-reading-management-1.png";
import "../index.css";
import loadingGIF from "../../public/ZKZg.gif";

function Navbar() {
  const user = useUser();
  const navigate = useNavigate();
  const [islogout, setislogout] = useState(true);

  const handle_logout = async () => {
    setislogout(false);

    try {
      await user.logout();
      navigate("/login");
    } catch (error) {
      setislogout(true);
      alert("error" + error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <nav className="w-full h-full ">
      <div className="w-full h-5/6 bg-yellow-500 flex justify-between items-center ">
        <div className="w-1/2 h-full flex items-center">

          <Link className="w-1/2 h-full flex items-center outline-none">
            <img className="w-19 h-full" src={logo} alt="" />
            <h1 className="text-2xl font-bold text-slate-800  max-450:text-md ">
              Meter Reading
            </h1>
          </Link>
        </div>

        <div className="w-1/2 h-full pr-2 flex justify-end items-center">
          {user.current ? (
            <>
              <button
                className="w-fit p-1 rounded-md text-slate-700 bg-white font-bold border"
                type="button"
                onClick={handle_logout}
              >
                {/* Logout */}
                {islogout ? (
                  "Logout"
                ) : (
                  <div className="flex items-center justify-center relative w-fit">
                    <span className="mr-2">Logout</span>
                    <img className="w-4 h-4" src={loadingGIF} alt="loading" />
                  </div>
                )}
              </button>
            </>
          ) : (
            <Link
              className="w-fit p-1 rounded-md text-slate-700 bg-white font-bold border"
              to={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="w-full h-1/6 text-white flex text-sm items-center pl-2 pt-2">
        {user.current ? (
          <p className="text-sm text-slate-300">Email: {user.current.email}</p>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

export default Navbar;
