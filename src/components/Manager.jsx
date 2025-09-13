import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import PasswordCard from './PasswordCard';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      console.log(ref.current.src)
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "text"

    }
    else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "password"

    }
  }


  useEffect(() => {

    let passwords = localStorage.getItem("passwords");
    if (passwords) {

      const parsedPasswords = JSON.parse(passwords).map(item => ({
        ...item,
        isVisible: item.hasOwnProperty('isVisible') ? item.isVisible : false // Ensure isVisible exists, default to false
      }));
      setpasswordArray(parsedPasswords);
    }
  }, []);


  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newPasswordEntry = { ...form, id: uuidv4(), isVisible: false };
      const updatedPasswordArray = [...passwordArray, newPasswordEntry];
      setpasswordArray(updatedPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      console.log("Saved passwords:", updatedPasswordArray);
      toast('Password saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      toast('Error Password not saved');
    }

  }


  const togglePasswordVisibilityInTable = (id) => {
    setpasswordArray(passwordArray.map(item => {
      if (item.id === id) {
        return { ...item, isVisible: !item.isVisible }; // Toggle the isVisible property
      }
      return item;
    }));
  };

  const editPassword = (id) => {
    console.log("Editing the id " + id)
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }
  const deletePassword = (id) => {
    console.log("deleting the id " + id)
    let c = confirm("Do you really want to delete it");
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });


  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }


  return (

    <div className='py-4'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-900 opacity-20 blur-[100px]"></div></div>

      <div className="main md:mycontainer min-h-[77vh] md:px-40 px-10 ">
        <h1 className='text-4xl text-center font-bold'>
          <span className='text-green-600'>&lt;</span>
          Pass
          <span className='text-green-600 text-bold'>Op/&gt;</span>
        </h1>
        <p className='text-center text-lg p-3'>Your password Manager</p>

        <div className='flex-col  items-center'>

          <input value={form.site} onChange={handleChange} className=' w-full rounded-full border border-green-500 mb-3 px-4 py-2' type="text" placeholder='Enter the website URL' name='site' />

          <div className=" md:flex w-full gap-3  ">
            <input value={form.username} onChange={handleChange} className='rounded-full w-full border border-green-500 px-4 md:my-0 my-5 py-2'
              type="text" placeholder='Enter Username' name='username' />

            <div className="relative md:mb-0 mb-5">
              <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full w-full px-4  py-2 border border-green-500'
                type="password" placeholder='Enter Password' name='password' />
              <span className='absolute right-0 top-[2px] cursor-pointer ' onClick={showPassword}>
                <img ref={ref} width={40} className='p-3 ' src="icons/eyecross.png" alt="eye" />
              </span>
            </div>
          </div>

        </div>
        <div className='flex justify-center items-center'>
          <button onClick={savePassword} className='flex justify-center items-center border border-green-400 rounded-full bg-green-500  px-5 py-3 mt-3 w-fit hover:bg-green-400'> <lord-icon
            src="https://cdn.lordicon.com/efxgwrkc.json"
            trigger="hover">
          </lord-icon> Save </button>
        </div>
        <div>
          <h2 className='font-bold text-xl flex justify-center mt-7 py-3'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show </div>}
          {passwordArray.length != 0 && (
  
          // <div className='table-wrapper'>
          //   <table className="table-auto mb-5 w-full">
          //     <thead className='bg-green-400 w-full  overflow-hidden ' >
          //       <tr>
          //         <th className='py-2'>Site</th>
          //         <th className='py-2'>Username</th>
          //         <th className='py-2'>Password</th>
          //         <th className='py-2'>Actions</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {passwordArray.map((item, index) => {
          //         return (
          //           <tr key={index}>
          //             <td className='py-2 text-center border border-white w-32 bg-green-50 rounded-lg '>
          //               <div className='flex px-4 items-center justify-between'>
          //                 <a href={item.site} target='_blank' rel="noopener noreferrer"><span className='long-url-text'>{item.site}</span></a>
          //                 <div onClick={() => { copyText(item.site) }} className='lordIconCopy size-7 cursor-pointer'>
          //                   <lord-icon
          //                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
          //                     src="https://cdn.lordicon.com/xuoapdes.json"
          //                     trigger="hover">
          //                   </lord-icon>
          //                 </div>
          //               </div>
          //             </td>
          //             <td className='py-2 text-center border border-white w-32 bg-green-50'>
          //               <div className='flex items-center pl-5 justify-center gap-7'>
          //                 <span>{item.username}</span>
          //                 <div onClick={() => { copyText(item.username) }} className='lordIconCopy size-7 cursor-pointer'>
          //                   <lord-icon
          //                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
          //                     src="https://cdn.lordicon.com/xuoapdes.json"
          //                     trigger="hover">
          //                   </lord-icon>
          //                 </div>
          //               </div>
          //             </td>
          //             <td className='py-2 text-center border border-white w-32 bg-green-50'>
          //               <div className='flex items-center pl-5 justify-center'>
          //                 <span>
          //                   {item.isVisible ? item.password : '••••••••'}
          //                 </span>
          //                 <div className='flex gap-2 items-center'>
          //                   <div onClick={() => copyText(item.password)} className='cursor-pointer'>
          //                     <lord-icon
          //                       style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
          //                       src="https://cdn.lordicon.com/xuoapdes.json"
          //                       trigger="hover">
          //                     </lord-icon>
          //                   </div>
          //                   <div onClick={() => togglePasswordVisibilityInTable(item.id)} className='cursor-pointer'>
          //                     <img width={25} src={item.isVisible ? "icons/eye.png" : "icons/eyecross.png"} alt="eye" />
          //                   </div>
          //                 </div>
          //               </div>
          //             </td>
          //             <td className='py-2 text-center border border-white w-32 bg-green-50'>
          //               <span className='ml-2 cursor-pointer' onClick={() => { editPassword(item.id) }}><lord-icon
          //                 src="https://cdn.lordicon.com/ibckyoan.json"
          //                 trigger="hover"
          //                 style={{ width: "25px", height: "25px" }}>
          //               </lord-icon></span>
          //               <span className='ml-2 cursor-pointer' onClick={() => { deletePassword(item.id) }}><lord-icon
          //                 src="https://cdn.lordicon.com/xyfswyxf.json"
          //                 trigger="hover"
          //                 style={{ width: "25px", height: "25px" }}>
          //               </lord-icon></span>
          //             </td>
          //           </tr>
          //         )
          //       })}
          //     </tbody>
          //   </table>
          //   </div>
          <div>
            <PasswordCard
              passwords={passwordArray}
              toggleVisibility={togglePasswordVisibilityInTable}
              copyText={copyText}
              editPassword={editPassword}
              deletePassword={deletePassword}
            />
          </div>

          )}
        </div>
      </div>


    </div>


  )
}

export default Manager
