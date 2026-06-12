import {useState} from "react";
import VoiceButton from "./VoiceButton";
import {speak} from "../utils/speak";


export default function AIChat(){


const [answer,setAnswer]=useState("");



function receive(text){


setAnswer(text);



let reply =
"Explain your biggest technical project";


speak(reply);


}



return(

<div className="chat">


<h2>
AI Interview
</h2>


<p>
AI: Tell me about yourself
</p>



<input value={answer}/>



<VoiceButton
onResult={receive}
/>


</div>


)

}