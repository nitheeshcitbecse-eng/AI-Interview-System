import {useState} from "react";

import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import ReportCard from "../components/ReportCard";
import SettingsPanel from "../components/SettingsPanel";

import "../App.css";


export default function Dashboard(){


const [report,setReport]=useState({

overall:0,
confidence:0,
communication:0,
technical:0,
clarity:0,

strengths:[],
improve:[]

});



return(

<div className="app">


<Sidebar/>


<div className="center">


<div className="topbar">
🔴 Live Interview
</div>


<AIAvatar setReport={setReport}/>



<div className="bottom">


<ResumeAnalyzer/>


<ReportCard report={report}/>


<SettingsPanel/>


</div>



</div>



<LiveAnalysis report={report}/>



</div>

)

}