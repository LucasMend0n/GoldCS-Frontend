import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login'

export default function RoutesC() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={Login}/>
            </Routes>
        </BrowserRouter>
    );
}

