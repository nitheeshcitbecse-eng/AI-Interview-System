import {useState} from "react";

import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";

import "../App.css";


export default function Dashboard(){


const [report,setReport]=useState({

overall:0,
communication:0,
technical:0,
confidence:0,
clarity:0

});


return(

<div className="app">


<Sidebar/>


<div className="fullPage">


<AIAvatar setReport={setReport}/>


<LiveAnalysis report={report}/>


</div>


</div>

)

}