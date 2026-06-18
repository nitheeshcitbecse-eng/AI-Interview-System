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



<div className="leftArea">



<div className="interviewWrapper">


<AIAvatar

setReport={setReport}

/>



<div className="bottomMini">



<div className="miniCard">


<h1>
📄 Resume Analyzer
</h1>


<p>
AI checks your resume strength and skills.
</p>


<button

onClick={()=>setPage("resume")}

>

Open Resume

</button>


</div>





<div className="miniCard">


<h1>
⚙ Settings
</h1>


<p>
Manage camera, mic and interview setup.
</p>



<button

onClick={()=>setPage("settings")}

>

Open Settings

</button>


</div>



</div>



</div>


</div>





<div className="rightArea">



<LiveAnalysis

report={report}

/>




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