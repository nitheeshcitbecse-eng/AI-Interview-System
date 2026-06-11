import {useState} from "react";

import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";
import ReportCard from "../components/ReportCard";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import SettingsPanel from "../components/SettingsPanel";

import "../App.css";


export default function Dashboard(){


const [page,setPage]=useState("dashboard");


const [report,setReport]=useState({

overall:0,
communication:0,
technical:0,
confidence:0,
clarity:0,
strengths:[],
improve:[]

});



return(

<div className="app">


<Sidebar setPage={setPage}/>


<div className="fullPage">


{
page==="dashboard" &&

<>

<AIAvatar setReport={setReport}/>

<div className="rightArea">

<LiveAnalysis report={report}/>

<BoostPanel/>

</div>

</>

}



{
page==="report" &&

<ReportCard report={report}/>

}



{
page==="resume" &&

<ResumeAnalyzer/>

}



{
page==="settings" &&

<SettingsPanel/>

}



</div>


</div>

)

}