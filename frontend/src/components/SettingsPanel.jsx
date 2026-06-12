import { useState } from "react";


export default function SettingsPanel(){


const [open,setOpen] = useState("");



const settings = [

{
icon:"👤",
title:"Profile",
desc:"Name, Email, Password, Profile Picture"
},


{
icon:"🎥",
title:"Camera",
desc:"Webcam selection and preview"
},


{
icon:"🎤",
title:"Microphone",
desc:"Voice input settings"
},


{
icon:"🔊",
title:"Speaker",
desc:"Audio output test"
},


{
icon:"🎯",
title:"Interview Preferences",
desc:"Technical, Behavioral, Mixed"
},


{
icon:"⚡",
title:"Difficulty",
desc:"Easy Medium Hard"
},


{
icon:"♿",
title:"Accessibility",
desc:"Captions and response timer"
},


{
icon:"🔒",
title:"Privacy",
desc:"Recording and data controls"
},


{
icon:"🔔",
title:"Notifications",
desc:"Email and browser alerts"
},


{
icon:"🎨",
title:"Appearance",
desc:"Dark / Light theme"
}


];




return(

<div className="settingsPage">


<h1>
⚙ Mock Interview Settings
</h1>



<div className="settingsGrid">


{

settings.map((item,index)=>(


<div

className="settingItem"

key={index}

onClick={()=>setOpen(item.title)}

>


<div>


<h2>

{item.icon} {item.title}

</h2>


<p>

{item.desc}

</p>


</div>



<span>
›
</span>



</div>


))


}


</div>




{

open &&


<div className="settingDetail">


<h2>

{open}

</h2>


<p>
Configure your {open} settings here.
</p>


<label>

Enable

<input type="checkbox"/>

</label>


</div>


}



</div>


)


}