import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";


export default function Login(){


const navigate=useNavigate();


const [name,setName]=useState("");
const [password,setPassword]=useState("");



function submit(e){

e.preventDefault();


if(name && password){

localStorage.setItem("user",name);

navigate("/dashboard");

}

}



return(


<div className="loginPage">



<div className="loginLeft">


<h1>
🤖 AI Interviewer
</h1>


<h2>
Your Personal AI Career Coach
</h2>


<p>

Practice interviews,
improve confidence,
and get real-time AI feedback.

</p>



<div className="features">


<div>
🎤 Voice Interview
</div>


<div>
📊 Live Analysis
</div>


<div>
📄 Resume Review
</div>


<div>
🏆 Smart Report
</div>


</div>



</div>




<form
className="loginBox"
onSubmit={submit}
>



<h1>
Welcome Back 👋
</h1>


<p>
Login to start your interview
</p>



<input

placeholder="Username"

onChange={
e=>setName(e.target.value)
}

/>



<input

type="password"

placeholder="Password"

onChange={
e=>setPassword(e.target.value)
}

/>



<button>

🚀 Start Interview

</button>



</form>



</div>


)

}