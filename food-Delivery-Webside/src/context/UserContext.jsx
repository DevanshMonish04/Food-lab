import React, { createContext, useState } from 'react'
import { food_items } from '../food'
export const dataContext=createContext()

function UserContext({children}) {
     let [cat,setCat]=useState(food_items)
    let[input,setInput]=useState("")
    let [showCart,setShowCart]=useState(false)
    let data={
        input,
        setInput,
        cat,
        setCat,
        showCart,
        setShowCart
    }


  return (
    
        <dataContext.Provider value={data}>
              {children}
        </dataContext.Provider>
    
   
  )
}

export default UserContext
