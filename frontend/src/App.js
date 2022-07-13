import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import webFont from 'webfontloader'
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";
import Products from "./components/Products/Products";
import Search from "./components/search/Search";
import LoginSignUp from "./components/user/loginSignUp/LoginSignUp";
import Account from './components/user/profile/Account'

import StatesContext from "./context/StatesContext";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { Fragment } from "react";
import UpdateUser from "./components/user/update user/UpdateUser";
import PassUpdate from "./components/user/passUpdate/PassUpdate";
import Forgotpass from "./components/user/forgotpass/Forgotpass";
import ResetPass from "./components/user/resetPass/ResetPass";
import Cart from './components/cart/Cart'
import Shipping from "./components/cart/shipping/Shipping";
import Confirmorder from "./components/cart/confirmorder/Confirmorder";
import Payment from "./components/cart/payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/cart/payment/success/Success";
import MyOrders from "./components/orders/MyOrders";
import OrderDetails from "./components/orders/orderDetails/OrderDetails";
import PrivateRoute from "./components/route/PrivateRoute";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AllProducts from "./components/admin/Products/All products/AllProducts";
import CreateProduct from "./components/admin/Products/createproduct/CreateProduct";
import UpdateProduct from "./components/admin/Products/updateProduct/UpdateProduct";
import OrderList from "./components/admin/orders/ordersList/OrderList";
import Updateorder from "./components/admin/orders/updateOrder/Updateorder";
import Allusers from "./components/admin/users/Allusers/Allusers";
import UpdateUserRole from "./components/admin/users/UpdateUserRole/UpdateUserRole";
import ProductReviews from "./components/admin/productReviews/ProductReviews";
import Contact from "./components/conatct/Contact";
import About from "./components/about/About";
import NotFound from "./components/Layout/notFound/NotFound";
import { useLoadUserQuery } from "./services/userApi";


function App() {
  const context = useContext(StatesContext)
  const { setisAuthenticated, setuserInfo, isAuthenticated, setshippingInfo, setcartItem, setorderInfo ,cartItem} = context
  const { data,isFetching } = useLoadUserQuery()
 

  const datakey = 'pk_test_51LEh52JqDCPVlA6BgC9ne36weALzI9rWWatTWeP9ap83btWoDvaRPOowZyuww0YEZx3VTPpD1p9qEzRqqdoAuYzw00uu2um8g0'
  const [stripePromise, setStripePromise] = useState(() => loadStripe(datakey))



  useEffect(() => {

    webFont.load({
      google: {
        families: ['Roboto', 'Droid sans', 'Chilanka', 'Macondo']
      }
    })

    if (!isFetching) {

      if (data && data.user) {
        setisAuthenticated(true)
        setuserInfo(data)
      }
    }
  }, [isFetching])

  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('cartItems'));
    if (retriveProducts) setcartItem(retriveProducts)

    const retriveShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    if (retriveShippingInfo) setshippingInfo(retriveShippingInfo)

    const retriveOrderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (retriveOrderInfo) setorderInfo(retriveOrderInfo)

  }, [])
  


  return (
    <Fragment>

      {/* {!isFetching && */}
        <>

          <Header />
          <Routes>

            {/* Public Routes */}

            <Route exact path='/' element={<Home />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/products' element={<Products />} />
            <Route exact path='/products/:keyword' element={<Products />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/password/forgot' element={<Forgotpass />} />
            <Route exact path='/password/reset/:token' element={<ResetPass />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/about' element={<About/>} />

            <Route exact path='/login' element={<LoginSignUp />} />
            
            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

              <Route exact path='/account' element={<Account />} />
              <Route exact path='/me/update' element={<UpdateUser />} />
              <Route exact path='/password/update' element={<PassUpdate />} />
              <Route exact path='/login/shipping' element={<Shipping />} />
              <Route exact path='/order/confirm' element={<Confirmorder />} />
              <Route exact path='/orders' element={<MyOrders />} />
              <Route exact path='/order/:id' element={<OrderDetails />} />

              <Route exact path='/process/payment' element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              } />

              <Route exact path='/success' element={<Success />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute/>}>
            <Route exact path='/admin/dashboard' element={<Dashboard />} />
            <Route exact path='/admin/products' element={<AllProducts />} />
            <Route exact path='/admin/product' element={<CreateProduct />} />
            <Route exact path='/admin/product/:id' element={<UpdateProduct />} />
            <Route exact path='/admin/orders' element={<OrderList />} />
            <Route exact path='/admin/order/:id' element={<Updateorder />} />
            <Route exact path='/admin/users' element={<Allusers />} />
            <Route exact path='/admin/user/:id' element={<UpdateUserRole />} />
            <Route exact path='/admin/reviews' element={<ProductReviews />} />


            </Route>
            <Route path="/*" element={<NotFound/>} />
           
          </Routes>

       

          <Footer />
        </>
        {/* } */}

    </Fragment>

  );
}

export default App;
