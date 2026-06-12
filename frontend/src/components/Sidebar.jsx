import { useNavigate } from "react-router-dom";


export default function Sidebar(){


const navigate = useNavigate();



return (

<div className="side">


<h2>
🤖 AI Interviewer
</h2>



<button
onClick={()=>navigate("/dashboard")}
>
🏠 Home
</button>



<button
onClick={()=>navigate("/mock")}
>
🎤 Mock Interview
</button>




<button
onClick={()=>navigate("/resume")}
>
📄 Resume Analyzer
</button>




<button
onClick={()=>navigate("/history")}
>
🕘 Interview History
</button>





<button
onClick={()=>navigate("/settings")}
>
⚙ Settings
</button>





<div

className="userCard"

onClick={()=>navigate("/premium")}

>


<h3>
👩 Deepika
</h3>


<p>
⭐ Premium Plan
</p>


</div>






<button

onClick={()=>{

localStorage.clear();

navigate("/");

}}

>

🚪 Logout

</button>




</div>


)


}