import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Manager from './components/Manager'
import MobileManager from './components/MobileManager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      {/* Mobile: show MobileManager on small screens */}
      <div className="md:hidden">
        <MobileManager />
      </div>

      {/* Desktop/tablet: show Manager on md+ screens */}
      <div className="hidden md:block">
        <Manager />
      </div>

      <Footer/>
    </>
  )
}

export default App
