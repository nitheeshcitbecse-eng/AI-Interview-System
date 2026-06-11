import {useState} from "react";

import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";

import ResumeAnalyzer from "../components/ResumeAnalyzer";
import ReportCard from "../components/ReportCard";
import SettingsPanel from "../components/SettingsPanel";


import "../App.css";


export default function Dashboard(){


const [page,setPage]=useState("dashboard");


const [report,setReport]=useState({});


return(

<div className="app">


<Sidebar setPage={setPage}/>


<div className="fullPage">


{
page==="dashboard" &&

<>

<AIAvatar setReport={setReport}/>

<LiveAnalysis report={report}/>

</>

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