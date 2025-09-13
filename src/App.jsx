import './App.css'

import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar/>
      {/* Show Manager on all screens */}
      <Manager />

      <Footer/>
    </>
  )
}

export default App
