export default function History(){



const history =
JSON.parse(
localStorage.getItem("interviews")
) || [];




return(

<div className="historyPage">


<h1>
🕘 Interview History
</h1>



{

history.length===0 ?

<h2>
No interviews completed yet
</h2>


:


history.map((item)=>(


<div className="historyCard" key={item.id}>


<h2>
🤖 {item.title}
</h2>


<p>
📅 {item.date}
</p>


<p>
Status :
<span className="complete">
 {item.status}
</span>
</p>



<div className="historyStats">


<div>
⭐ Score
<h2>{item.score}</h2>
</div>



<div>
🎤 Confidence
<h2>{item.confidence}</h2>
</div>



<div>
💬 Communication
<h2>{item.communication}</h2>
</div>


<div>
🧠 Technical
<h2>{item.technical}</h2>
</div>


</div>


<button>

View Detailed Report

</button>



</div>


))


}



</div>

)

}