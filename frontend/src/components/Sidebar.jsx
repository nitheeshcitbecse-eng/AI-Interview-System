import {useNavigate} from "react-router-dom";


export default function Sidebar(){

const navigate = useNavigate();


return(

<div className="side">


<h2>
✦ AI Interviewer
</h2>


<button onClick={()=>navigate("/dashboard")}>
🏠 Home
</button>


<button>
💬 Mock Interview
</button>



<button onClick={()=>navigate("/resume")}>
📄 Resume Analyzer
</button>



<button>
🧠 Practice Topics
</button>



<button>
📈 Interview History
</button>



<button>
🤖 AI Feedback
</button>



<button>
🏆 Leaderboard
</button>




<button onClick={()=>navigate("/settings")}>
⚙ Settings
</button>




<div className="userCard">

👩 Deepika

<br/>

⭐ Premium Plan

</div>




<button onClick={()=>navigate("/")}>
🚪 Logout
</button>



</div>


)

}