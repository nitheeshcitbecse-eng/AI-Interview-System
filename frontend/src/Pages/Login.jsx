import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";


function Login(){

const nav=useNavigate();

const [name,setName]=useState("");
const [pass,setPass]=useState("");


function submit(e){

e.preventDefault();

if(name && pass){

localStorage.setItem("user",name);

nav("/dashboard");

}

}


return (

<div className="login">


<form onSubmit={submit}>

<h1>AI Interviewer</h1>

<input
placeholder="Username"
onChange={e=>setName(e.target.value)}
/>


<input
type="password"
placeholder="Password"
onChange={e=>setPass(e.target.value)}
/>


<button>
Login
</button>


</form>

</div>

)


}

export default Login;