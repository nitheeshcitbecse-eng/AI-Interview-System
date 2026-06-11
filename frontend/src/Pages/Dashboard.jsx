import AIAvatar from "../components/AIAvatar";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import ReportCard from "../components/ReportCard";
import SettingsPanel from "../components/SettingsPanel";

import "../App.css";


function Dashboard(){


return(

<div className="dashboard">


<div className="sidebar">

<h2>AI Interviewer</h2>

<p>🏠 Home</p>
<p>🎤 Mock Interview</p>
<p>📄 Resume Analyzer</p>
<p>📊 Report</p>
<p>⚙ Settings</p>

</div>



<div className="main">


<AIAvatar/>

<div className="bottom">

<ResumeAnalyzer/>

<ReportCard/>

<SettingsPanel/>


</div>


</div>


</div>


)


}

export default Dashboard;