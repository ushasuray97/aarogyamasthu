import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import MainHome from './component/Views/User/UserHome/MainHome.js';
import Login from './component/Views/User/Login/Login';
import Register from './component/Views/User/Register/Register'
import Home from './component/Views/Home/Home';
import Dashboard from "./component/Views/Dashboard/Dashboard";
import MainDashboard from "./component/layout/MainDashboard";
import ProtectedRoute from './ProtectedRoute.js';

import ManageRole from './component/Views/ResourceAllocation/ManageRole/ManageRole.js';
import ManageUsers from './component/Views/ResourceAllocation/ManageUsers/ManageUsers.js';
import BillingManagement from './component/Views/BillingManagement/BillingManagement.js';
import AddUsersPopup from './component/Views/ResourceAllocation/ManageUsers/AddUsersPopup.js';
import ManageProfile from './component/Views/Manage Profile/ManageProfile.js';
import ShareIcons from './component/layout/SpeedDial/ShareIcons.js'; 
import ForgotPassword from './component/Views/User/ForgotPassword/ForgotPassword'
import UserDashboardPage from './component/Views/User/UserDashboard/Dashboard';
import AboutUsPage from './component/Views/User/AboutUs/AboutUs';
import ViewMorePage from './component/Views/User/ViewMore/ViewMore';
import Admins from './component/Views/Admin/Admins.js';
import { addAdmin } from './store/reducers/manageAdmins/addAdminSlice.js';
import AddAdmin from './component/Views/Admin/AddAdmin.js';
import AreawiseSearch from './component/Views/Admin/AreawiseSearch.js';
const MainRoutes = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate replace to="home" />}/> 
        <Route exact path="/home" element={<MainHome />} /> 
        <Route exact path="/login" element={ <Login /> } /> 
        <Route exact path="/register" element={ <Register /> } /> 
        <Route exact path="/forgotPassword" element={ <ForgotPassword /> } />  
        <Route exact path="/userDashboradpage" element={ <UserDashboardPage /> } /> 
        <Route exact path="/useraboutus" element={ <AboutUsPage /> } /> 
        <Route exact path="/userviewmore" element={ <ViewMorePage /> } /> 
        {/* <Route exact path="/" element={<ProtectedRoute />}> */}
        <Route exact path="/" element={<MainDashboard />}>
            <Route path="/" element={<Navigate replace to="home" />} /> 
            <Route exact path="/adminhome" element={<Admins/>} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/manageprofile" element={<ManageProfile />} />
            
            <Route exact path="/admin/addadmin" element={<AddAdmin />} />
            <Route exact path='/admin/search' element={<AreawiseSearch/>}/>
            {/* <Route exact path="/projects/editproject/:id" element={<AddProject />} /> */}
            <Route exact path="/managerole" element={<ManageRole />} />
            <Route exact path="/adduserspopup" element={<AddUsersPopup />} />
            <Route exact path="/manageusers" element={<ManageUsers/>} />
            <Route exact path="billingmanagement" element={<BillingManagement />} />
          {/* </Route> */}
        </Route>

      </Routes>
      {/* <ShareIcons /> */}

    </>
  )
}

export default MainRoutes