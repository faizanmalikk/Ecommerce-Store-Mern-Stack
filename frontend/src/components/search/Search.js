import React,{useState} from 'react'
import { StyledBox,SearchFeild, StyledButton } from './style'
import {useNavigate} from 'react-router-dom'
import MetaData from '../Layout/MetaData'
const Search = () => {
    const [keyword, setkeyword] = useState('')
    const navigate = useNavigate();
   const hanldeSubmitHander = (e)=>{
   e.preventDefault();
   if(keyword.trim()){
       navigate(`/products/${keyword}`)
   }
   else{
       navigate('/products')
   }
   }

  return (
    <StyledBox >
        <MetaData title={'Search A Product -- ECOMMERCE'}/>
        <SearchFeild id="demo-helper-text-misaligned-no-helper" placeholder='Search a product' 
        onChange={(e)=> setkeyword(e.target.value)}/>
        <StyledButton variant="contained" type='submit' onClick={hanldeSubmitHander}>Search</StyledButton>

    </StyledBox>
  )
}

export default Search