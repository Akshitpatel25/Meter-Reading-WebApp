import { useEffect, useState } from "react";
import { useUser } from "../appwrite/users";
import { useIdeas } from "../appwrite/Notes";
import ZKZgGIF from '../../public/ZWdx.gif'


function Form({setshowform}) {

  const user = useUser();
  const ideas = useIdeas()
  const [title, settitle] = useState()
  const [name, setname] = useState()
  const [Number, setNumber] = useState()
  const [Adhar, setAdhar] = useState()
  const [isloading, setisloading] = useState(true)
  const [Gender, setgender] = useState('Male')
  const [Unit, setUnit] = useState()

  const handle_Form_cancel = () => {
    setshowform((prev) => !prev)
  }

  const handle_form_data = async() => {
    if (title == "" && name == "" && Number == "" && Adhar == "" && Gender == "" && Unit == "") return alert("please fill all fields")
    
    // console.log(gender);

    setisloading(false)

    try {
      ideas.add({userID: user.current.$id, title, name, Number, Adhar, Gender, Unit})
      settitle("")
      setshowform((prev) => !prev)
  
    } catch (error) {
      alert("handle Form " + error)
    }
  }

  return (
    <div className='w-full h-full p-2 flex flex-col bg-slate-700 gap-y-3 rounded-xl'>
      <button onClick={handle_Form_cancel} className='self-end font-bold' >X</button>

      <form className="flex flex-col gap-y-2" onSubmit={handle_form_data}>
        <input type="text"
        placeholder='Room number'
        value={title}
        required
        className="w-full bg-transparent border p-2 text-xl outline-none text-white rounded-md"
        onChange={(e)=> settitle(e.target.value)} />

        <input type="text"
        placeholder='Person name'
        value={name}
        required
        className="w-full bg-transparent border p-2 text-xl outline-none text-white rounded-md"
        onChange={(e)=> setname(e.target.value)} />

        <input type="text"
        placeholder='Phone number'
        value={Number}
        required
        className="w-full bg-transparent border p-2 text-xl outline-none text-white rounded-md"
        onChange={(e)=> setNumber(e.target.value)} />

        <input type="text"
        placeholder='Adhar number'
        value={Adhar}
        required
        className="w-full bg-transparent border p-2 text-xl outline-none text-white rounded-md"
        onChange={(e)=> setAdhar(e.target.value)} />

        <select name="Gender" id="Gender" 
        className="bg-transparent border" 
        value={Gender}
        onChange={(e)=> setgender(e.target.value)}>
          <option className="bg-black" value="Male">Male</option>
          <option className="bg-black" value="Female">Female</option>
        </select>

        <input type="text"
        placeholder='Electric Unit rate'
        value={Unit}
        required
        className="w-full bg-transparent border p-2 text-xl outline-none text-white rounded-md"
        onChange={(e)=> setUnit(e.target.value)} />
        
        <button type='submit'
          className='w-full text-xl  font-bold h-11 flex justify-center items-center border rounded-md p-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-500'
          >{isloading ? "Submit": <img className='w-1/3 h-full flex justify-center items-center' src={ZKZgGIF} alt='Login...'/>}
          
        </button>
        
      </form>
    </div>
  );
}

export default Form;
