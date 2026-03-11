import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero"
import WhoWeAre from "./components/WhoWeAre";
import WhoWeServe from "./components/WhoWeServe";
import Services from "./components/Services";
import ChooseInteger from "./components/ChooseInteger";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ContactPage from "./components/ContactPage";

export function App() {
  return (
   <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage/>}/>
        
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
