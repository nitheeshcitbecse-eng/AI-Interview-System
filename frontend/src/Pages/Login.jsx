import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";


export default function Login(){

const navigate=useNavigate();


const [username,setUsername]=useState("");
const [password,setPassword]=useState("");



function submit(e){

e.preventDefault();


if(!username || !password){

alert("Enter details");

return;

}


localStorage.setItem(
"user",
username
);


navigate("/dashboard");


}



return(

<div className="loginPage">


<div className="loginLeft">


<h1>
🤖 AI Interviewer
</h1>


<h2>
Smart Mock Interview Platform
</h2>


<p>
AI voice interview, resume analysis and live performance report.
</p>



<div className="features">

<div>🎤 Voice AI</div>
<div>📊 Live Analysis</div>
<div>📄 Resume AI</div>
<div>🏆 Report Card</div>


</div>


</div>





<form
className="loginBox"
onSubmit={submit}
>


<h1>
Login
</h1>



<input

placeholder="Username"

value={username}

onChange={e=>setUsername(e.target.value)}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={e=>setPassword(e.target.value)}

/>



<button>

Start Interview 🚀

</button>



</form>



</div>


)

}