import React, { useEffect, useState } from "react";
import { useUser } from "../appwrite/users";
import { useIdeas } from "../appwrite/Notes";
import delelogo from '../../public/icons8-delete-50.png';
import SingleData from "./SingleData";
import { Link, useNavigate } from "react-router-dom";

function Datalist() {
  const user = useUser();
  const ideas = useIdeas();

  const [onlydata, setOnlydata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSelected, setisSelected] = useState(true);
  const [selectedData, setselectedData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.current && ideas.current) {
      try {
        const filteredIdeas = ideas.current.filter(
          (prev) => prev.userID === user.current.$id
        );
        setOnlydata(filteredIdeas);
      } catch (err) {
        setError(err.message);
      }
    }
    setLoading(false);
  }, [user, ideas]);

  // this function is for deleting data
  const handle_del = (id,title) => {
    let person = prompt(`You want to Delete "${title}" Type "Yes"`)

    if (person == "Yes" || person == "yes") {
      ideas.remove(id)
    }

  }

  // this is for check 
  if (onlydata.length === 0) {
    return <div className="flex justify-center items-center"><img src="/public/ZKZg.gif" alt="" className="w-10 h-10" /></div>;
  }

  //this is for each data
  const handle_click = (id) => {
    // console.log(id);
    setisSelected((prev)=> !prev)
    const data = ideas.current.filter((prev) => prev.$id == id)
    setselectedData(data);
  }

  return (

    <div className="w-full h-full overflow-auto p-2 flex flex-col  items-center gap-y-5">
      
      {isSelected ? (
        <div className="w-full h-full flex flex-col items-center gap-y-5">
          {onlydata.map((prev) => (
            <div key={prev.$id} 
            
            className="flex text-slate-300 w-full items-center bg-customcol1 rounded-md p-2 pl-4 ">
    
                <div 
                onClick={()=> handle_click(prev.$id)}
                className=" w-11/12">
                    <h1 className="text-2xl font-bold">{prev.title}</h1>
                    <p className="text-md">➤ {prev.name}</p>
                </div>
    
                <div 
                className="w-1/12 z-20 flex justify-center items-center">
                    <button
                    onClick={()=> handle_del(prev.$id,prev.title)}
                    >
                        <img className="h-7 w-fit " src={delelogo} alt="Bin" />
                    </button>
                </div>
            </div>
            
          ))}
        </div>
      ) : (
        <div className="w-full h-full z-20 bg-customcol1 flex flex-col gap-y-2">
          
          <SingleData setisSelected={setisSelected} selectedData={selectedData} setselectedData={setselectedData}/>
          
          
        </div>
      )}
      
      
      
    </div>
  );
}

export default Datalist;
