import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";


export default function Login(){


const navigate = useNavigate();


const [username,setUsername]=useState("");
const [password,setPassword]=useState("");



function handleSubmit(e){

e.preventDefault();


if(username.trim()==="" || password.trim()===""){

alert("Enter username and password");

return;

}


localStorage.setItem(
"user",
username
);


// OPEN DASHBOARD

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
Practice interviews with AI voice,
resume analysis and live feedback.
</p>



<div className="features">

<div>
🎤 Voice AI
</div>

<div>
📊 Live Score
</div>

<div>
📄 Resume AI
</div>

<div>
🏆 Report Card
</div>


</div>


</div>




<form
className="loginBox"
onSubmit={handleSubmit}
>



<h1>
Login
</h1>



<input

type="text"

placeholder="Username"

value={username}

onChange={
e=>setUsername(e.target.value)
}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>



<button type="submit">

🚀 Start Interview

</button>



</form>


</div>

)

}