import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar, { NAVBAR_OFFSET_TOP_CLASS } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import ContactPage from "./components/ContactPage";
import ServicesPage from "./components/ServicesPage";

import WirelessServicesPage from "./components/WirelessPage";
import FiberEngineeringPage from "./components/FiberEngineeringPage";

import AboutPage from "./components/Aboutpage"; 

import DataCenterPage from "./components/DataCenterPage";

import DroneTowerAuditPage from "./components/DroneTowerAuditPage";
import ChipsetTestingPage from "./components/chipsetPage";
import ProductsPage from "./components/ProductPage";




export function App() {
  return (
   <Router>
      <ScrollToTop />
      <Navbar />
      <main className={NAVBAR_OFFSET_TOP_CLASS}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/wireless" element={<WirelessServicesPage />} />
          <Route path="/services/fiber" element={<FiberEngineeringPage />} />
          <Route path="/services/data-center" element={<DataCenterPage />} />
          <Route path="/services/tower" element={<DroneTowerAuditPage />} />
          <Route path="/services/chipset" element={<ChipsetTestingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          {/* Legacy URLs → new /services/* paths */}
          <Route path="/wirelessPage" element={<Navigate to="/services/wireless" replace />} />
          <Route path="/fiberPage" element={<Navigate to="/services/fiber" replace />} />
          <Route path="/dataCenterPage" element={<Navigate to="/services/data-center" replace />} />
          <Route path="/droneTowerPage" element={<Navigate to="/services/tower" replace />} />
          <Route path="/chipsetPage" element={<Navigate to="/services/chipset" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          {/*<Route path="/about" element={<Navigate to="/products" replace />} />*/}
        
        <Route path="/about" element={<AboutPage />} />
        
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
