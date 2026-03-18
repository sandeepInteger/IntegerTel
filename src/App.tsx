import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ContactPage from "./components/ContactPage";
import ServicesPage from "./components/ServicesPage";

import WirelessServicesPage from "./components/WirelessPage";
import FiberEngineeringPage from "./components/FiberEngineeringPage";
{/**
import DataCenterPage from "./components/DataCenterPage";
import DroneTowerAuditPage from "./components/DroneTowerAuditPage";
import ChipsetTestingPage from "./components/chipsetPage";
import AboutPage from "./components/Aboutpage"; 
*/}


export function App() {
  return (
   <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/services" element={<ServicesPage/>}/>
        
        
        <Route path="/wirelessPage" element={<WirelessServicesPage/>}/>
        <Route path="/fiberPage" element={<FiberEngineeringPage/>}/>
        {/**
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dataCenterPage" element={<DataCenterPage/>}/>
        <Route path="/droneTowerPage" element={<DroneTowerAuditPage/>}/>
        <Route path="/chipsetPage" element={<ChipsetTestingPage/>}/> 
        */}
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
