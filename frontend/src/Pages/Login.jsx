import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";


export default function Login(){

const nav=useNavigate();

const [mode,setMode]=useState("login");


return(

<div className="loginPage">


<div className="particles">
<span></span>
<span></span>
<span></span>
<span></span>
</div>



<motion.div

className="robotSection"

initial={{x:-100,opacity:0}}

animate={{x:0,opacity:1}}

>


<img
src="/src/assets/hero.png"
className="bigRobot"
/>


<h1>
AI INTERVIEWER
</h1>


<p>
Your personal robotic interview assistant
</p>


<div className="loginFeatures">

<div>🤖 AI Voice</div>
<div>📊 Live Analysis</div>
<div>📄 Resume AI</div>
<div>⚡ Smart Feedback</div>


</div>



</motion.div>





<motion.div

className="loginCard"

initial={{scale:.5,opacity:0}}

animate={{scale:1,opacity:1}}

>


<h1>

{
mode==="login"
?
"Welcome Back"
:
mode==="signup"
?
"Create Account"
:
"Reset Password"
}

</h1>



{
mode!=="forgot" &&

<input placeholder="Username"/>

}



<input placeholder="Email"/>



{
mode!=="forgot" &&

<input
type="password"
placeholder="Password"
/>

}



<button

onClick={()=>nav("/dashboard")}

>

{
mode==="login"
?
"LOGIN 🚀"
:
mode==="signup"
?
"SIGN UP"
:
"SEND RESET LINK"

}

</button>



<div className="loginLinks">


<p onClick={()=>setMode("login")}>
Login
</p>


<p onClick={()=>setMode("signup")}>
Signup
</p>


<p onClick={()=>setMode("forgot")}>
Forgot Password
</p>


</div>


</motion.div>



</div>


)

}