import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Shop from './components/Shop'
import About from './components/About'
import Contact from './components/Contact'
import Services from './components/Services'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carouselslider from "./components/Carouselslider"

const App = () => {
  return <>
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/shop" element={<Shop />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/contact" element={<Contact />}></Route>

    </Routes>
  </BrowserRouter>
   <Carouselslider/>
   
  </>
}

export default App