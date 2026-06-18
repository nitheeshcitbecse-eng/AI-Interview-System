import {useState} from "react";


export default function SettingsPanel(){


const [camera,setCamera]=useState(true);

const [mic,setMic]=useState(true);

const [speed,setSpeed]=useState(1);



return(

<div className="bigPage">


<h1>
⚙ Interview Settings
</h1>



<div className="settingBox">


<h2>
Camera
</h2>

<button onClick={()=>setCamera(!camera)}>

{camera?"ON":"OFF"}

</button>



<h2>
Microphone
</h2>


<button onClick={()=>setMic(!mic)}>

{mic?"ON":"OFF"}

</button>



<h2>
AI Voice Speed
</h2>


<input

type="range"

min="0.5"

max="2"

step="0.1"

value={speed}

onChange={
e=>setSpeed(e.target.value)
}

/>


<h2>
Language
</h2>


<select>

<option>
English
</option>

<option>
Tamil
</option>

<option>
Hindi
</option>

</select>



<h2>
Difficulty
</h2>


<select>

<option>
Beginner
</option>

<option>
Intermediate
</option>

<option>
Advanced
</option>


</select>



</div>


</div>


)

}