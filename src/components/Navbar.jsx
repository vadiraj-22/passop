import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-700 flex h-16 items-center '>
            <div className="mycontainer md:px-30 px-5 flex justify-between   items-center ">
                <div className=' logo font-bold text-2xl text-white flex items-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>Op/&gt;</span>
                </div>
                {/* <ul>
                <li className='flex gap-6 text-white h-14 items-center'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="/">About</a>
                    <a className='hover:font-bold' href="/">Contact</a>
                </li>
            </ul> */}

                <a href="https://github.com/vadiraj-22/passop" target="_blank" rel="noopener noreferrer" className='flex gap-2 justify-center items-center bg-green-500 rounded-full px-2 py-1 font-bold '>
                    <img className='w-10 ' src="/icons/github.svg" alt="github logo" />
                    GitHub
                </a>
            </div>

        </nav>
    )
}

export default Navbar
