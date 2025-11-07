import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { GiHamburger } from "react-icons/gi";
import { FaPizzaSlice } from "react-icons/fa6";
import { MdOutlineFoodBank } from "react-icons/md";
import { CiBowlNoodles } from "react-icons/ci";
import { TbSoup } from "react-icons/tb";
 const Categories=[
    {
        id:1,
        name:"All",
        icon:<TiThSmallOutline className="w-[60px] h-[60px] text-green-600"/>
    }, {
        id:2,
        name:"breakfast",
        icon:<MdOutlineFreeBreakfast className="w-[60px] h-[60px] text-green-600" />
    }, {
        id:3,
        name:"soups",
        icon:<TbSoup className="w-[60px] h-[60px] text-green-600"/>
    }, {
        id:4,
        name:"pasta",
        icon:<CiBowlNoodles className="w-[60px] h-[60px] text-green-600"/>
    }, {
        id:5,
        name:"main_course",
        icon:<MdOutlineFoodBank className="w-[60px] h-[60px] text-green-600"/>
    }, {
        id:6,
        name:"pizza",
        icon:<FaPizzaSlice className="w-[60px] h-[60px] text-green-600"/>
    }, {
        id:7,
        name:"burger",
        icon:<GiHamburger className="w-[60px] h-[60px] text-green-600"/>
    }
]
export default Categories