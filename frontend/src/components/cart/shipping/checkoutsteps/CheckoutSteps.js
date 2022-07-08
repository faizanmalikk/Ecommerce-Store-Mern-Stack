import React from 'react'
import {  Typography , Stepper ,Step, StepLabel, useMediaQuery} from '@mui/material'
import {LocalShipping , LibraryAddCheck , AccountBalance} from '@mui/icons-material'

const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label : <Typography>Shipping Details</Typography>,
            icon : <LocalShipping/>
        },
        {
            label : <Typography>Confirm Order</Typography>,
            icon : <LibraryAddCheck/>
        },
        {
            label : <Typography>Payment</Typography>,
            icon : <AccountBalance/>
        }
    ]

    // const [isLargerThan325] = useMediaQuery('(min-width: 325px)')

    const isLargerThan325 = useMediaQuery('(min-width: 325px)')

  return (
    <>
     
{ isLargerThan325 &&
    <Stepper alternativeLabel activeStep={activeStep}   sx={{margin:'1.5em 0',boxSizing:'border-box'}}>
   {steps.map((item,index)=>{
   return <Step key={index}
   active = {activeStep === index ? true : false}
   completed = {activeStep >= index ? true : false}
   >
    <StepLabel icon={item.icon}
 style={{
    color: activeStep >= index ? "#42a5f5" : "rgba(0, 0, 0, 0.649)",
    fontSize:'10px'
  }} 
    sx={{fontSize:'10px'}}  >
       {item.label}
       
    </StepLabel>
    </Step>
   })}
    </Stepper>}
    </>
  )
}

export default CheckoutSteps