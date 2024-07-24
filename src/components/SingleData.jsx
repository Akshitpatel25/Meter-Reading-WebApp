/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useUser } from "../appwrite/users";
import { useNavigate } from "react-router-dom";
import { useIdeas } from "../appwrite/Notes";

function SingleData({ setisSelected, selectedData, setselectedData }) {
  const user = useUser();
  const navigate = useNavigate();
  const { update } = useIdeas();
  const [editName, seteditName] = useState(false);
  const [edNameVal, setedNameVal] = useState('');

  const [editNumber, seteditNumber] = useState(false);
  const [edNumberVal, setedNumberVal] = useState('');

  const [editAdhar, seteditAdhar] = useState(false);
  const [edAdharVal, setedAdharVal] = useState('');

  const [editGender, seteditGender] = useState(false);
  const [edGenderVal, setedGenderVal] = useState('');

  const [editUnit, seteditUnit] = useState(false);
  const [edUnitVal, setedUnitVal] = useState('');

  const [billForm, setbillForm] = useState(false)
  const [meter, setmeter] = useState('')

  // edit name
  const handle_editname = async (name, id) => {
    seteditName(!editName)
    setedNameVal(name)
    if (editName) {
      await update(id, { name: edNameVal });
      setselectedData((prevData) => 
        prevData.map((item) =>
          item.$id === id ? { ...item, name: edNameVal } : item
        )
      );
    }
  }

  // edit number
  const handle_editNumber = async (Number, id) => {
    seteditNumber(!editNumber)
    setedNumberVal(Number)
    if (editNumber) {
      await update(id, { Number: edNumberVal });
      setselectedData((prevData) => 
        prevData.map((item) =>
          item.$id === id ? { ...item, Number: edNumberVal } : item
        )
      );
    }
  }

  // edit adhar
  const handle_editAdhar = async (Adhar, id) => {
    seteditAdhar(!editAdhar)
    setedAdharVal(Adhar)
    if (editAdhar) {
      await update(id, { Adhar: edAdharVal });
      setselectedData((prevData) => 
        prevData.map((item) =>
          item.$id === id ? { ...item, Adhar: edAdharVal } : item
        )
      );
    }
  }

  // edit Gender
  const handle_editGender = async (Gender, id) => {
    seteditGender(!editGender)
    setedGenderVal(Gender)
    if (editGender) {
      await update(id, { Gender: edGenderVal });
      setselectedData((prevData) => 
        prevData.map((item) =>
          item.$id === id ? { ...item, Gender: edGenderVal } : item
        )
      );
    }
  }

  // edit Unit
  const handle_editUnit = async (Unit, id) => {
    seteditUnit(!editUnit)
    setedUnitVal(Unit)
    if (editUnit) {
      await update(id, { Unit: edUnitVal });
      setselectedData((prevData) => 
        prevData.map((item) =>
          item.$id === id ? { ...item, Unit: edUnitVal } : item
        )
      );
    }
  }

  // months and year
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const years = [];
  for (let i = 2020; i <= 2030; i++) {
    years.push(i);
  }

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // new rent submit
  const [bill, setbill] = useState([])

  const handleRentSubmit = async() => {
    const singledata = selectedData[0];
    const mmyy = `${selectedMonth}${selectedYear}${meter}`;

    
    if (!meter || !selectedMonth || !selectedYear) {
      return alert("Please fill all details");
    }

    const newMMYY = [mmyy, ...singledata.MMYYmeter];

    let checkmmyymeterisempty = Boolean(selectedData[0].MMYYmeter[0]);

    let newElecBill;
    if (checkmmyymeterisempty == false) {
      const elecbill = meter * selectedData[0].Unit;
      const sliceElecbill = String(elecbill).slice(0,7)
      newElecBill = [sliceElecbill, ...singledata.ElecBill];
    }else {
      const prevmonthReading = selectedData[0].MMYYmeter[0].slice(7,20)
      const elecbill = (meter - prevmonthReading) * selectedData[0].Unit;
      const sliceElecbill = String(elecbill).slice(0,7)
      newElecBill = [sliceElecbill, ...singledata.ElecBill];
    }

    const updatedData = selectedData.map((item) => 
      item.$id === singledata.$id ? { ...item, MMYYmeter: newMMYY, ElecBill: newElecBill} : item
    );

    // setbill(newElecBill) // to assign all Elecbill, so that we can add all content in one box

    try {
      await update(singledata.$id, { MMYYmeter: newMMYY, ElecBill: newElecBill });
      setselectedData(updatedData);
      setbillForm(!billForm);
      setSelectedMonth("");
      setSelectedYear("");
      setmeter("");
    } catch (error) {
      alert(`Error in adding new Rent: ${error.message}`);
    }
    
  }
  
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setbill(selectedData[0].ElecBill)
    console.log(selectedData[0]);
  }, [user, navigate, billForm]);

  if (!selectedData) {
    return <div className="w-full h-full z-20 bg-customcol1 p-2">Loading...</div>;
  }

  return (
    <div className="w-full h-full z-20 bg-customcol1 p-2 flex flex-col gap-y-2 overflow-auto">
      <div className="flex">
        <button
          className="bg-black rounded-md p-1 pl-2 pr-2"
          onClick={() => setisSelected((prev) => !prev)}
        >
          ⮜ Back
        </button>
      </div>

      <div className="w-full bg-black rounded-lg p-2 text-slate-300">
        {selectedData.map((prev) => (
          <div key={prev.$id} className="flex flex-col gap-y-2 text-lg">
            <h1 className="text-3xl font-bold">{prev.title}</h1>

            <h3 className="">
              Name: {editName ? (
                <input
                  type="text"
                  className="border bg-transparent"
                  value={edNameVal}
                  onChange={(e) => setedNameVal(e.target.value)}
                />
              ) : (
                prev.name
              )}
              <button className="bg-slate-500 rounded-md ml-2 text-black" onClick={() => handle_editname(prev.name, prev.$id)}>
                {editName ? "📥" : "✎"}
              </button>
            </h3>

            <h3>
            Phone no.: {editNumber ? (
                <input
                  type="text"
                  className="border bg-transparent"
                  value={edNumberVal}
                  onChange={(e) => setedNumberVal(e.target.value)}
                />
              ) : (
                prev.Number
              )}
              <button className="bg-slate-500 rounded-md ml-2 text-black" onClick={() => handle_editNumber(prev.Number, prev.$id)}>
                {editNumber ? "📥" : "✎"}
              </button>
            </h3>

            <h3>
            Adhar no.: {editAdhar ? (
                <input
                  type="text"
                  className="border bg-transparent"
                  value={edAdharVal}
                  onChange={(e) => setedAdharVal(e.target.value)}
                />
              ) : (
                prev.Adhar
              )}
              <button className="bg-slate-500 rounded-md ml-2 text-black" onClick={() => handle_editAdhar(prev.Adhar, prev.$id)}>
                {editAdhar ? "📥" : "✎"}
              </button>
            </h3>

            <h3>
            Gender: {editGender ? (
                <input
                  type="text"
                  className="border bg-transparent"
                  value={edGenderVal}
                  onChange={(e) => setedGenderVal(e.target.value)}
                />
              ) : (
                prev.Gender
              )}
              <button className="bg-slate-500 rounded-md ml-2 text-black" onClick={() => handle_editGender(prev.Gender, prev.$id)}>
                {editGender ? "📥" : "✎"}
              </button>
            </h3>

            <h3>
            Unit Rate: {editUnit ? (
                <input
                  type="text"
                  className="border bg-transparent"
                  value={edUnitVal}
                  onChange={(e) => setedUnitVal(e.target.value)}
                />
              ) : (
                prev.Unit
              )}
              <button className="bg-slate-500 rounded-md ml-2 text-black" onClick={() => handle_editUnit(prev.Unit, prev.$id)}>
                {editUnit ? "📥" : "✎"}
              </button>
            </h3>
          </div>
        ))}
      </div>

      <button 
      onClick={() => setbillForm(!billForm)}
      className='w-fit p-2 absolute bottom-0 right-0 mb-4 mr-4 rounded-md text-slate-700 bg-white font-bold border'
      >
        New Entry
      </button>
      
      {billForm && (
        <div 
        className="w-72 bg-slate-600 flex flex-col h-fit p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-xl z-10"
        >
          <button 
          onClick={() => setbillForm(!billForm)}
          className='self-end'
          >X</button>
          <h1 className="text-center text-2xl font-bold">New Entry</h1>

          <div className="flex flex-col gap-y-1">
            <select
            className="bg-black"
            value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select 
            className="bg-black"
            value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <div>
              Selected Month: {selectedMonth}
            </div>
            <div>
              Selected Year: {selectedYear}
            </div>

            <div>
              Meter Reading: 
              <input type="text"
              value={meter}
              required
              onChange={(e) => setmeter(e.target.value)}
              className="bg-black pl-1 text-white border"
              />
            </div>

            <button 
            onClick={handleRentSubmit}
            className='w-full h-11 flex justify-center items-center border rounded-md p-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-500'
            >
              Submit
            </button>
          </div>
        </div>
      )}
      
      <div className=" w-full flex flex-col gap-y-3">

        <h1 className='font-bold text-2xl text-yellow-500'> Meter Reading History</h1>

        <div className="w-full">
          {selectedData.map((prev)=> (
            <div key={prev.$id} className=" flex flex-col gap-y-4">
              {prev.MMYYmeter.map((item, index) => (
                <div key={item} className=" rounded-lg bg-black p-2 flex">

                  <div className="w-2/3 ">
                    <p className='text-xl font-bold text-slate-300'>{item.slice(0, 7)}</p>
                    <p className="font-semibold text-slate-300">Meter Reading : <span className="text-yellow-500">{item.slice(7,20)}</span></p>
                  </div>
                  <div className=" w-4/12 flex flex-col items-center ">
                    <p className="font-semibold text-slate-300">Electric Bill</p>
                    <p className="text-yellow-500 font-semibold text-xl">₹ {bill[index]}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>


          {/* 
          IF ANY PROBLEM OR MISSMATCH NUMBER IS SHOWING AT LINE 355 / <p>{bill[index]}</p>, 
          THEN COMMENT OUT BELOW CODE.
          */}

        {/* {
          selectedData.map((prev) => (
            <div key={prev.$id}>
              {
                prev.ElecBill.map((item, index)=> (
                  <p key={index}>
                    <p>Current bill</p>
                    <p>₹ {item.slice(0,4)} Rs</p>
                  </p>
                ))
              }
            </div>
          ))
        } */}

      </div>

    </div>
  );
}

export default SingleData;
