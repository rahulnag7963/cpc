import React from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Header from './Header';
import IndividualCoin from './Pages/IndividualCoin';
function App() {

  return (
      <Router>
        <div className="p-3 mb-2 bg-dark text-white">
        <Header />
          <Routes>
            <Route path ="/" element = {<Home/>} exact />
            <Route path = "/IndividualCoin/:CryptoId" element = {<IndividualCoin/>}></Route>
        </Routes>
        </div>
    </Router>    
  
  );
}

export default App;
