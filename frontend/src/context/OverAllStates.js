import React,{ useState,useEffect } from "react";
import StatesContext from "./StatesContext";
const OverAllStates = (props)=>{
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [userInfo, setuserInfo] = useState('')
  const [resetPage , setresetPage] = useState(false)
  const [cartItem, setcartItem] = useState([])
  const [shippingInfo, setshippingInfo] = useState('')
  const [orderInfo, setorderInfo] = useState('')
  const [updateProductPage, setupdateProductPage] = useState('')
  const [updateOrderPage, setupdateOrderPage] = useState('')
 const [userRolePage, setuserRolePage] = useState('')
 const [IsorderShipped, setIsorderShipped] = useState(false)
 const [cartpage, setcartpage] = useState(false)

  useEffect(() => {
        
    if(shippingInfo){
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
        
    }

}, [shippingInfo])

  return(
       <StatesContext.Provider value={{cartpage, setcartpage ,IsorderShipped, setIsorderShipped ,userRolePage, setuserRolePage,updateOrderPage, setupdateOrderPage,updateProductPage, setupdateProductPage,orderInfo, setorderInfo,shippingInfo, setshippingInfo,isAuthenticated,cartItem,setcartItem,setisAuthenticated,userInfo,setuserInfo,setresetPage,resetPage}}>
           {props.children}
       </StatesContext.Provider>
    )
}
export default OverAllStates;