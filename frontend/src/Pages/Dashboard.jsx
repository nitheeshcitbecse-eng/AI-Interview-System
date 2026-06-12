import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import LiveAnalysis from "../components/LiveAnalysis";
import {useState} from "react";
import "../App.css";


export default function Dashboard(){


const [page,setPage] = useState("home");


const userName =
localStorage.getItem("userName") || "User";



return(


<div className="appLayout">


<Sidebar 
setPage={setPage}
/>



<div className="dashboard">



<div className="topBar">


<h2>
🤖 AI Interview System
</h2>


<div className="profile">

👤 {userName}

</div>


</div>





{page==="home" &&

<div className="interviewGrid">



<div className="robotBox">


<AIAvatar />


<h2>
Hi {userName}
</h2>


<p>
I am your AI Interviewer. Tell me about yourself.
</p>



<div className="controls">


<button className="speakBtn">

🎤 Speak

</button>


<button className="endBtn">

⛔ End Interview

</button>


</div>


</div>




<div className="progressBox">


<h2>
📈 Interview Progress
</h2>



<div className="progressCircle">

75%

</div>



<div className="progressBars">


<div>
<span>Introduction</span>
<div className="bar">
<div className="fill one"></div>
</div>
</div>



<div>
<span>Technical Round</span>
<div className="bar">
<div className="fill two"></div>
</div>
</div>




<div>
<span>Communication</span>
<div className="bar">
<div className="fill three"></div>
</div>
</div>



<div>
<span>Final Feedback</span>
<div className="bar">
<div className="fill four"></div>
</div>
</div>


</div>



</div>





<LiveAnalysis />



</div>


}





{page==="premium" &&

<div>

<h1>
Premium Plan
</h1>

</div>

}



</div>


</div>


)

}