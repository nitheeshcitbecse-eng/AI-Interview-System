import {useState} from "react";


export default function VoiceButton(){


const [text,setText]=useState("");



function speak(){


let msg =
new SpeechSynthesisUtterance(
"Tell me about your recent project"
);


speechSynthesis.speak(msg);


}



function listen(){


let SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



let rec=new SpeechRecognition();



rec.start();



rec.onresult=(e)=>{


setText(
e.results[0][0].transcript
);


}


}



return(

<div>


<button onClick={speak}>

🤖 Ask Question

</button>



<button onClick={listen}>

🎤 Answer

</button>



<p>

{text}

</p>


</div>

)

}