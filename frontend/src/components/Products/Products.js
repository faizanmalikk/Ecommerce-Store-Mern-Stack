import { Box, CircularProgress, Rating, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetAllProductsQuery } from '../../services/productsApi'
import ProductCard from '../home/ProductCard'
import { useParams } from 'react-router-dom'
import { FilteredRatings, NoProductHeading, ProductHeading, StyledBox, StyledCategory, StyledPagination, StyledSlider } from './style'
import Alertshai from '../Layout/Alerts/Alertshai'
import MetaData from '../Layout/MetaData'


const Products = () => {
  let { keyword } = useParams()
  const [searchKeyword, setsearchKeyword] = useState(keyword)
  const [Page, setPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const [ratings, setRatings] = useState(0)
  const [categoriesActive, setcategoriesActive] = useState({
    avtiveObject : null,
    categories : [
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
      "Comp",
      'All'
    ]
  })
 
  const [category, setcategory] = useState('')
  const { data, isFetching, error } = useGetAllProductsQuery({ Page, price, category, searchKeyword, ratings })


  const hanldePrice = (event, newPrice) => {

    setPrice(newPrice)
 

  }

  const handleCategoryChange = (category , i)=>{
    if(category === 'All'){
      setcategory('')
      setsearchKeyword('')
    
    }else{
      
      setcategory(category)
      
    }
    setcategoriesActive({...categoriesActive,avtiveObject : categoriesActive.categories[i]})
  }

  const toggleActiveStyle = (i)=>{
    if(categoriesActive.categories[i] === categoriesActive.avtiveObject){
      return 'activeCategory'
    }else{
      return 'unactiveCategory'
    }
  }
 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category,searchKeyword])


  return (
    <>
      {error && <Alertshai severity={'error'} text={error.data.message} />}


      <>
        <MetaData title={'Products - Ecommerce'} />
        
        <Box marginBottom={9} minHeight='80vh'>
          <ProductHeading>Products</ProductHeading>
        
          <Box display={'flex'} flexDirection={{xs:'column-reverse',md:'row'}} >
            <Box paddingTop={{md:'1em'}}>
              <StyledSlider >
                <Box display={{xs:'none',md:'block'}}>
                  <Typography fontWeight={'bold'}>Price</Typography>
                  <Slider
                    value={price}
                    onChange={hanldePrice}
                    min={0}
                    max={25000}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    sx={{  margin: '0 auto',width:{xs:'70%',sm:'10em',md:'6.5em'} }}
                    

                  />
                </Box>
                <Box  >
                  <Typography fontWeight={'bold'} sx={{ textAlign: { xs: 'center', md: 'start' } }}>Categories</Typography>
                  <Box component={'div'} onClick={() => setPage(1)}>
                    {categoriesActive.categories.map((category, i) => {
                      return <StyledCategory  className={toggleActiveStyle(i)} component={'li'} onClick={() => handleCategoryChange(category , i)} key={i}>{category}</StyledCategory>
                    })}

                  </Box>
                  <FilteredRatings component={'fieldset'} marginLeft={{ xs: '0', md: '-14px' }} margin={{ xs: '0 auto' }} onClick={() => setRatings(0)}>
                    <Typography component="legend" fontSize={'18px'} >Ratings Above</Typography>
                    <Rating name="no-value" value={ratings} onChange={(e, newrating) => setRatings(newrating)} sx={{ fontSize: '29px' }} />
                  </FilteredRatings>

                </Box>
              </StyledSlider>
            </Box>
            <StyledBox >
            
              <Box width='100%'>

              {!isFetching && data.product.length === 0 && (
             <Box display={'flex'} justifyContent='center' marginTop={{md:'5em'}}>
                  
                 <NoProductHeading>No product Found</NoProductHeading>
              </Box>
          )}
            
              {isFetching ? (
                   <Box display={'flex'} justifyContent='center' 
                   alignItems={'center'} height={'50vh'} >
                        
                        <CircularProgress size={80}/>
                    </Box>
              ) :
                <Box  display ='flex' flexDirection= 'row' justifyContent={'center'}  flexWrap ='wrap' gap='25px'>
                  {data && data.product.map((product, i) => {
                    return <Box key={i} width={{xs:'95%',sm:'13em',md:'12.4em'}}>
                      <ProductCard product={product} />
                    </Box>
                  })}

                </Box>
              }
              </Box>
            </StyledBox>

          </Box>




          {data && data.resultPerPage < data.filteredProductCount && (

            <StyledPagination color='primary' size='large'
              count={Math.ceil(data.productCount / data.resultPerPage)}
              page={Page}
              shape='rounded'
              onChange={(event, value) => setPage(value)}
              showLastButton showFirstButton hideNextButton hidePrevButton
              onClick={()=>  window.scrollTo(0, 0)}

            />
          )}

        </Box>
     
      </>



    </>
  )
}

export default Products