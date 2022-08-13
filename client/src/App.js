import React from 'react';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <ToastContainer position="top-center"></ToastContainer>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route   path="/add" element={<AddEdit/>}/>
                    <Route   path="/update/:id" element={<AddEdit/>}/>
                    <Route   path="/view/:id" element={<View/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
