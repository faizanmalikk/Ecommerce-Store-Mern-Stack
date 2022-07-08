import React, { useState,useEffect,useContext } from 'react'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import MetaData from '../../Layout/MetaData'
import { FormContainershipping, FormHeadingshipping, StyledBoxshipping } from './style'
import { Home, LocationCity, Phone, PinDrop } from '@mui/icons-material'
import {Country , State} from 'country-state-city'
import CheckoutSteps from './checkoutsteps/CheckoutSteps'
import StatesContext from '../../../context/StatesContext'
import Alertshai from '../../Layout/Alerts/Alertshai'
import {useNavigate} from 'react-router-dom'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '250px',
            position: 'absolute',
            bottom: '0',
            right: '-100%',

        },
    },
};

const Shipping = () => {

    const context = useContext(StatesContext)
    const { shippingInfo, setshippingInfo } = context
    const navigate = useNavigate()

    const [CheckphnLength, setCheckphnLength] = useState(false)
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('')
    const [pincode, setpincode] = useState('')
    const [phoneno, setphoneno] = useState('')
    const [country, setcountry] = useState('')
    const [state, setstate] = useState('')
    const [countrycode, setcountrycode] = useState('')




    const shippingSubmit = (e) => {

      e.preventDefault()

      if(phoneno.length <= 10) return setCheckphnLength(true)


     setshippingInfo({address,city,pincode,phoneno,country,state,countrycode})
     navigate('/order/confirm')
     
    }
    
 useEffect(() => {
    if(shippingInfo){
        setaddress(shippingInfo.address)
        setcity(shippingInfo.city)
        setpincode(shippingInfo.pincode)
        setphoneno(shippingInfo.phoneno)
        setcountry(shippingInfo.country)
        setstate(shippingInfo.state)
        setcountrycode(shippingInfo.countrycode)
    }
 }, [shippingInfo])
 
    

    return (
        <>
            <MetaData title={'Shipping Details'} />
            <CheckoutSteps activeStep={0}/>
            <StyledBoxshipping>
                <FormContainershipping>
                    <FormHeadingshipping>Shipping Profile</FormHeadingshipping>
                    <Box component={'form'} onSubmit={shippingSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                        <TextField
                            label="Address"
                            name='address'
                            value={address}
                            required
                            onChange={(e) => setaddress(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Home />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField
                            label="City"
                            name='city'
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                            type={'text'}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCity />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField
                            label="Pincode"
                            name='pincode'
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                            type={'number'}

                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PinDrop />
                                    </InputAdornment>
                                )
                            }} />
                        <TextField
                            label="Phoneno"
                            name='phoneno'
                            value={phoneno}
                            onChange={(e) => setphoneno(e.target.value)}
                            type={'number'}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone />
                                    </InputAdornment>
                                )
                            }} />
                            {CheckphnLength && <Alertshai severity={'error'} text='Phone Number must be greater then 10 characters'/>}

                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                required
                                name='country'
                                value={country}
                                onChange={(e) => setcountry(e.target.value)}
                                input={<OutlinedInput label="country" />}
                                MenuProps={MenuProps}
                              >

                                {Country && Country.getAllCountries().map((name) => (
                                   
                                    <MenuItem
                                        key={name.isoCode}
                                        value={name.name}
                                        onClick={() => setcountrycode(name.isoCode) }
                                    >
                                        {name.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                      { country &&  <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                required ={true}
                                name='state'
                                value={state}
                                onChange={(e) => setstate(e.target.value)}
                                input={<OutlinedInput label="state" />}
                                MenuProps={MenuProps}
                              >

                                {State && State.getStatesOfCountry(countrycode).map((item) => (
                                    <MenuItem
                                        key={item.isoCode}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> }


                        <Button variant="contained" type='submit' onMouseOut={()=> setCheckphnLength(false)} sx={{ marginTop: '30px', width: '100%' }}>Continue</Button>

                    </Box>
                </FormContainershipping>
            </StyledBoxshipping>
        </>
    )
}

export default Shipping