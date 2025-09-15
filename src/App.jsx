import Training from "./Training.jsx";
import HtmlCss from "./HtmlCss.jsx";
import Javascript from "./Javascript.jsx";
import React from "./React.jsx"
import Custom from "./Custom.jsx";
import About from "./About.jsx"
import Contact from "./Contact.jsx"
import Resources from "./Resources.jsx"
import Rules from "./Rules.jsx"
import { HashRouter, Routes, Route } from "react-router-dom";
import './i18n'; //language changer


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Training/>}/>
        <Route path="/HtmlCss" element={<HtmlCss />}/>
        <Route path="/Javascript" element={<Javascript />}/>
        <Route path="/Custom" element={<Custom/>} />
        <Route path="/React" element={<React />}/>

      {/*Header navigations */}
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Resources" element={<Resources/>}/>
        <Route path="/Rules" element={<Rules/>}/>
      {/*-----------------------------------------------------*/}

        <Route path="*" element={
        <div className="text-red-900 text-center mt-10">
          404 - Page Not Found
        </div>} 
        />
      </Routes>
    </HashRouter>
  );
  
}

export default App
