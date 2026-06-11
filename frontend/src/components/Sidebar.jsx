export default function Sidebar({setPage}){


return(

<div className="sidebar">


<h2>
🤖 AI Interview
</h2>


<button onClick={()=>setPage("dashboard")}>
🏠 Dashboard
</button>


<button onClick={()=>setPage("resume")}>
📄 Resume Analyzer
</button>


<button onClick={()=>setPage("report")}>
📊 Report Card
</button>


<button onClick={()=>setPage("settings")}>
⚙ Settings
</button>


</div>

)

}