import Sidebar from "../components/Sidebar";
import AIAvatar from "../components/AIAvatar";
import ChatWindow from "../components/ChatWindow";
import LiveAnalysis from "../components/LiveAnalysis";
import FeatureCard from "../components/FeatureCard";


export default function Dashboard(){

return(

<div className="appLayout">


<Sidebar/>


<div className="dashboard">


<div className="topBar">

<h3>
🔴 Live Interview
</h3>


<div className="profile">
👩 Deepika ▾
</div>

</div>




<div className="interviewGrid">



<div className="robotBox">


<AIAvatar/>


<div className="wave">

〰〰🎤〰〰

</div>


<ChatWindow/>


<button className="endBtn">

End Interview

</button>


</div>





<div className="progressBox">


<h3>
Interview Progress
</h3>


<div className="timer">

12:45

<span>
/30:00
</span>

</div>



<ul>

<li>🟢 Introduction</li>

<li>🔵 Technical Q&A</li>

<li>Problem Solving</li>

<li>Behavioral</li>

<li>Wrap Up</li>

</ul>


</div>




<div className="analysisBox">


<LiveAnalysis/>


<div className="question">

<h3>
Current Question
</h3>


<p>
What is the difference between supervised and unsupervised learning?
</p>


<button>
💡 Hint
</button>


</div>



</div>



</div>





<div className="bottomGrid">


<FeatureCard
icon="📄"
title="Resume Analyzer"
description="AI resume scoring and suggestions"
/>


<FeatureCard
icon="📊"
title="Interview Report"
description="Complete performance report"
/>


<FeatureCard
icon="🧠"
title="Practice Topics"
description="AI generated questions"
/>


<FeatureCard
icon="⚙️"
title="Settings"
description="Customize your AI"
/>



</div>



</div>


</div>

)

}