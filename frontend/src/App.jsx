import {Routes,Route} from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

import ResumePage from "./Pages/ResumePage";
import SettingsPage from "./Pages/SettingsPage";


export default function App(){


return(

<Routes>


<Route path="/" element={<Login/>}/>


<Route path="/dashboard" element={<Dashboard/>}/>


<Route path="/resume" element={<ResumePage/>}/>


<Route path="/settings" element={<SettingsPage/>}/>



</Routes>


)

}