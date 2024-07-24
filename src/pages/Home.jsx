import React, { useEffect, useState } from "react";
import { useUser } from "../appwrite/users";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/meter-reading-management-1.png";
import "../index.css";
import loadingGIF from "../../public/ZKZg.gif";
import { useIdeas } from "../appwrite/Notes";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Datalist from "../components/Datalist";

function Home() {
  const user = useUser();
  const ideas = useIdeas();
  const navigate = useNavigate();
  const [showform, setshowform] = useState(false);

  useEffect(() => {
    console.log(user); // Add this line
    if (!user) {
      navigate("/login");
    }

    // const userlogin = localStorage.getItem("cookieFallback");
    // console.log(userlogin);

    // if (userlogin === null || userlogin === "") {
    //   console.log("user nahe hai");
    // } else {
    //   console.log("user hai");
    // }
  }, []);

  const handle_Form = () => {
    setshowform(!showform);
  };

  return (
    
    <div className="w-screen h-screen bg-black text-white">
      {/*main screen*/}
      <div className="w-screen h-1/6">
        <Navbar />
      </div>

      {showform && (
        <div className="w-72 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-xl z-10">
          <Form setshowform={setshowform} />
        </div>
      )}

      <button
        onClick={handle_Form}
        className="w-fit p-1 text-xl absolute z-10 bottom-0 right-0 mb-4 mr-4 rounded-md text-slate-700 bg-white font-bold border"
      >
        Create new data
      </button>

      <div className="w-screen h-5/6 pt-5 relative">
        <Datalist />
      </div>
    </div>
  );
}

export default Home;
