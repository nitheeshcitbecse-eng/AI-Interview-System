const settings=[

"📡 Network & Connectivity",

"Wi-Fi",

"Bluetooth",

"Mobile Network & SIM",

"Airplane Mode",

"Hotspot & Tethering",

"🖥 Display & Audio",

"Brightness",

"Light / Dark Mode",

"Wallpaper",

"Font Size",

"🔊 Sound",

"Volume",

"Do Not Disturb",

"🔐 Privacy & Security",

"Accounts",

"App Permissions",

"App Lock",

"🔋 Battery",

"Storage",

"Date & Time",

"Language",

"Accessibility",

"Developer Options"


];


export default function SettingsPanel(){


return(

<div className="settingsPage">


<h1>
⚙ Application Settings
</h1>


{


settings.map((item,i)=>(


<div

className="settingItem"

key={i}

>


{item}


<span>
›
</span>


</div>


))


}



<button className="logout">
Logout
</button>



</div>


)

}