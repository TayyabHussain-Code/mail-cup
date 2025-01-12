import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Comonents/Layouts/Layout";
import SignUp from "./Comonents/Signup/Signup";
import SignIn from "./Comonents/Signin/Signin";
import Dashboards from "./Comonents/Dashboard/DashBoardpage";
import Customer from "./Comonents/Customers/Customer";
import EditCustomer from "./Comonents/Customers/EditCustomer";

function Routers(){
    
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<Layout />}>
            <Route index element={<Dashboards />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/edit-customer/:Id" element={<EditCustomer/>} /> 
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Routers;