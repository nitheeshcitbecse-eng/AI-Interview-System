import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";


export default function Login(){


const navigate = useNavigate();


const [username,setUsername]=useState("");
const [password,setPassword]=useState("");



function handleSubmit(e){

e.preventDefault();

console.log("SUBMIT CLICKED");


if(username && password){

localStorage.setItem("user",username);

console.log("GOING DASHBOARD");

navigate("/dashboard");

}

else{

alert("Enter username and password");

}

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
/* ===== ONLY LAYOUT CHANGES ===== */


.dashboardGrid{

height:100%;

display:grid;

grid-template-columns:
2.2fr 1fr;

gap:20px;

}


/* left AI area up */

.leftArea{

height:100%;

display:flex;

flex-direction:column;

justify-content:flex-start;

}





.interviewWrapper{

display:flex;

flex-direction:column;

gap:18px;

}




/* keep your old AI colors */

.interviewBox{

height:70vh;

width:100%;

}





/* keep robot size */

.avatarBox img{

height:85%;

}




/* mini cards under robot */


.bottomMini{

display:grid;

grid-template-columns:
1fr 1fr;

gap:18px;

}




.miniCard{

background:

rgba(255,255,255,0.08);

backdrop-filter:blur(20px);

border-radius:25px;

padding:20px;

box-shadow:

0 0 25px #5428ff;

}





/* right side */


.rightArea{

height:100%;

display:flex;

flex-direction:column;

gap:20px;

}





.rightArea .bigAnalysis{

height:55%;

}




.rightArea .boostPanel{

height:40%;

}





/* remove accidental white */

.fullPage,
.leftArea,
.rightArea{

background:transparent;

}





@media(max-width:1000px){


.dashboardGrid{

grid-template-columns:1fr;

}


.bottomMini{

grid-template-columns:1fr;

}

}