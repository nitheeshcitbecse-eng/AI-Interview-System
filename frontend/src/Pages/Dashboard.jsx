import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import ReportCard from "../components/ReportCard";
import SettingsPanel from "../components/SettingsPanel";
import "../App.css";


export default function Dashboard(){

return(

<div className="app">


<Sidebar/>


<div className="center">


<div className="topbar">

<h2>🔴 Live Interview</h2>

</div>


<AIAvatar/>


<div className="bottom">


<ResumeAnalyzer/>

<ReportCard/>

<SettingsPanel/>

</div>


</div>



<LiveAnalysis/>


</div>

)

}