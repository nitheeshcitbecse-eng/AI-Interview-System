import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MockInterview from "./Pages/MockInterview";
import ResumePage from "./Pages/ResumePage";
import SettingsPage from "./Pages/SettingsPage";
import History from "./Pages/History";
import Premium from "./Pages/Premium";



function App() {


  return (

    <Routes>


      {/* Login */}

      <Route
        path="/"
        element={<Login />}
      />



      {/* Main Dashboard */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />



      {/* Full Screen Interview */}

      <Route
        path="/mock"
        element={<MockInterview />}
      />



      {/* Resume Analyzer */}

      <Route
        path="/resume"
        element={<ResumePage />}
      />



      {/* Settings */}

      <Route
        path="/settings"
        element={<SettingsPage />}
      />



      {/* Interview History */}

      <Route
        path="/history"
        element={<History />}
      />



      {/* Premium */}

      <Route
        path="/premium"
        element={<Premium />}
      />


    </Routes>

  );

}



export default App;