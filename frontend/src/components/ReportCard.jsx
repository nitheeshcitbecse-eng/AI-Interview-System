export default function ReportCard({report}){


return(

<div className="reportPage">


<h1>
🏆 Interview Rank Card
</h1>



<div className="finalScore">

{report.overall || 0}

</div>


<h2>
Score / 100
</h2>



<div className="reportGrid">


<div>
<h3>Communication</h3>
<h1>{report.communication || 0}%</h1>
</div>



<div>
<h3>Technical</h3>
<h1>{report.technical || 0}%</h1>
</div>



<div>
<h3>Confidence</h3>
<h1>{report.confidence || 0}%</h1>
</div>



<div>
<h3>Clarity</h3>
<h1>{report.clarity || 0}%</h1>
</div>


</div>




<h2>
Strengths
</h2>


{
report.strengths?.map((x,i)=>
<p key={i}>✔ {x}</p>
)
}



<h2>
Improve
</h2>


{
report.improve?.map((x,i)=>
<p key={i}>⚠ {x}</p>
)
}



</div>

)

}