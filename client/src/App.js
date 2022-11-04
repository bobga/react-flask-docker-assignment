import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { CONFIG } from './config.js';

import Home from './components/Home';
import Project from './components/Project';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects/:id" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;