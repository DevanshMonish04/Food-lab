import React from 'react'
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { TbPlaylist } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='w-full h-[100px] bg-black fixed bottom-0 md:top-0  text-white flex 
    justify-around md:justify-center items-center gap-[50px] p-[20px]'>
        <Link to={"/"}><TiHome  className='w-[30px] h-[25px]'/>  </Link>
       <Link to={"/search"}> <IoSearch  className='w-[30px] h-[25px]'/>   </Link>
       <Link to={"/playlist"}> <TbPlaylist  className='w-[30px] h-[25px]'/></Link>
       <Link to={"/liked"}> <FaHeart  className='w-[30px] h-[25px]'/></Link>
    </div>
  )
}

export default Nav