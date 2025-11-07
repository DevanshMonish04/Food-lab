import React from 'react'
import girl from "../assets/girl.webp"
import hoodie from "../assets/hoodie.webp"
import jacket from "../assets/jacket.jpg"
import moodle from "../assets/moodle.jpg"
import back from "../assets/back.webp"

function Background({heroCount}) {
  
   if(heroCount===0){
    return <img src={girl} alt='' className='w-[100%] h-[100%] 
    float-left overflow-auto object-cover'/>

   }else if(heroCount===1){
    return <img src={back} alt='' className='w-[100%] h-[100%] 
    float-left overflow-auto object-cover'/>

   }else if(heroCount===2){
    return <img src={jacket} alt=''className='w-[100%] h-[100%] 
    float-left overflow-auto object-cover'/>

   }else if(heroCount===3){
    return <img src={moodle} alt=''className='w-[100%] h-[100%] 
    float-left overflow-auto object-cover'/>
   }

  

}


export default Background
