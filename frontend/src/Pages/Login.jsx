import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";


export default function Login(){


const navigate = useNavigate();


const [username,setUsername] = useState("");
const [password,setPassword] = useState("");



const handleLogin=(e)=>{

e.preventDefault();

localStorage.setItem(
"userName",
username
);



navigate("/dashboard");

}




return(

<div className="loginPage">



<div className="robotSection">


<img 
src="/src/assets/hero.png"
alt="AI Robot"
/>


<h1>
AI Interviewer
</h1>



<div className="loginFeatures">


<div>
🤖
AI Interview
</div>


<div>
🎤
Voice Interaction
</div>


<div>
📊
Live Analysis
</div>


<div>
📄
Resume AI
</div>



</div>


</div>





<form 
className="loginCard"
onSubmit={handleLogin}
>



<h2>
Welcome Back
</h2>



<input

type="text"

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

required

/>





<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

/>





<button type="submit">

Login

</button>




<div className="loginLinks">


<span>
Forgot Password?
</span>


<span>
Sign Up
</span>


</div>



</form>



</div>

)

}