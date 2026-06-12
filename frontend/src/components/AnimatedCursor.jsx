import {useEffect,useState} from "react";


export default function AnimatedCursor(){


const [pos,setPos]=useState({
x:0,y:0
});


useEffect(()=>{

window.onmousemove=(e)=>{

setPos({
x:e.clientX,
y:e.clientY
})

}

},[])



return(

<div

className="cursor"

style={{

left:pos.x,
top:pos.y

}}

/>

)

}