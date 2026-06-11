import {useState} from "react";

import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import ReportCard from "../components/ReportCard";
import SettingsPanel from "../components/SettingsPanel";
import BoostPanel from "../components/BoostPanel";

import "../App.css";


export default function Dashboard(){


const [page,setPage]=useState("dashboard");


const [report,setReport]=useState({

overall:0,
communication:0,
technical:0,
confidence:0,
clarity:0

});



return(

<div className="app">


<Sidebar setPage={setPage}/>



<div className="fullPage">


{
page==="dashboard" &&

<div className="dashboardGrid">


<div>


<AIAvatar setReport={setReport}/>


</div>


<div>


<LiveAnalysis report={report}/>


<BoostPanel/>


</div>


</div>

}




{
page==="resume" &&

<ResumeAnalyzer/>

}



{
page==="report" &&

<ReportCard report={report}/>

}




{
page==="settings" &&

<SettingsPanel/>

}



</div>


</div>

)

}