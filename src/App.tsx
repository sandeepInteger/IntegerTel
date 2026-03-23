import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar, { NAVBAR_OFFSET_TOP_CLASS } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import ContactPage from "./components/ContactPage";
import ServicesPage from "./components/ServicesPage";

import WirelessServicesPage from "./components/WirelessPage";
import FiberEngineeringPage from "./components/FiberEngineeringPage";
{/**
import AboutPage from "./components/Aboutpage"; 
*/}
import DataCenterPage from "./components/DataCenterPage";

import DroneTowerAuditPage from "./components/DroneTowerAuditPage";
import ChipsetTestingPage from "./components/chipsetPage";




export function App() {
  return (
   <Router>
      <ScrollToTop />
      <Navbar />
      <main className={NAVBAR_OFFSET_TOP_CLASS}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />

          <Route path="/wirelessPage" element={<WirelessServicesPage />} />
          <Route path="/fiberPage" element={<FiberEngineeringPage />} />
          {/**
        <Route path="/about" element={<AboutPage />} />
        */}
          <Route path="/dataCenterPage" element={<DataCenterPage />} />

          <Route path="/droneTowerPage" element={<DroneTowerAuditPage />} />
          <Route path="/chipsetPage" element={<ChipsetTestingPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
