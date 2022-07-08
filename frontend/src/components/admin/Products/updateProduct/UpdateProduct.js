import React, { useContext, useState, useEffect } from 'react'
import StatesContext from '../../../../context/StatesContext'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import MetaData from '../../../Layout/MetaData'
import Sidebar from '../../sidebar/Sidebar'
import { FormContainercreate, FormHeadingcreate, InputFilecreate, StyledBoxcreate, StyledDescription } from './style'
import { AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material'
import { useLocation, useNavigate , useParams} from 'react-router-dom'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import {  useGetProductDetailQuery, useUpdateProductMutation } from '../../../../services/productsApi'
import Loader from '../../../Layout/loader/Loader'


const UpdateProduct = () => {

    const context = useContext(StatesContext)
    const { setupdateProductPage } = context
    const { id } = useParams()
    
    const location = useLocation()

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

    const [UpdateProductAdmin, responseInfo] = useUpdateProductMutation()
    const { data, isFetching } = useGetProductDetailQuery(id)
   const navigate = useNavigate()

    const [name, setname] = useState('')
    const [price, setprice] = useState(0)
    const [description, setdescription] = useState('')
    const [category, setcategory] = useState('')
    const [stock, setstock] = useState(0)
    const [images, setimages] = useState([])
    const [imagesPreview, setimagesPreview] = useState([])
    const [oldImages, setoldImages] = useState([])


    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
        "Comp"
    ];

    const createProductSubmitHandle = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
    
   {  images ?  images.forEach((image) => {
          myForm.append("images", image)
        }) :  myForm.append("images", oldImages)}

        UpdateProductAdmin({id,myForm  })
    }

    const updateProductImagesChange = (e) => {

        const files = Array.from(e.target.files)
        setimages([])
        setimagesPreview([])

        files.forEach((file) => {

            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setimagesPreview((old) => [...old, reader.result])
                    setimages((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })

    }


    useEffect(() => {
        setupdateProductPage(id)

        if (!isFetching) {

            setname(data.product.name)
            setprice(data.product.price)
            setcategory(data.product.category)
            setstock(data.product.stock)
            setdescription(data.product.description)
            setoldImages(data.product.images)
        }
       
        if(responseInfo.status === 'fulfilled'){
         
              navigate('/admin/products')
        }
        
     

    }, [isFetching, responseInfo  ])

   
    


    return (
        <>
            {responseInfo.error && <Alertshai severity={'error'} text={responseInfo.error.data.message} />}

            <MetaData title={'Update Product'} />

            <Box >
              <Box >
                <Box >
                    <Sidebar />
                </Box>
                <Box maxWidth='100%' overflow={'hidden'} marginLeft={{ sm: '8.5em', md: '12em' }}>
                    {isFetching || responseInfo.isLoading ? <Loader /> : <StyledBoxcreate>
                        <FormContainercreate>
                            <FormHeadingcreate>Update Product</FormHeadingcreate>
                            <Box component={'form'} encType='multipart/form-data' onSubmit={createProductSubmitHandle} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                                <TextField

                                    name='name'
                                    value={name}
                                    placeholder='Product Name'
                                    type={'text'}
                                    required
                                    onChange={(e) => setname(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Spellcheck />
                                            </InputAdornment>
                                        )
                                    }} />
                                <TextField

                                    name='price'
                                    value={price}
                                    onChange={(e) => setprice(e.target.value)}
                                    type={'number'}
                                    placeholder='Price'
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney />
                                            </InputAdornment>
                                        )
                                    }} />
                                <Box display='flex' position={'relative'}>
                                    <Description sx={{ position: 'absolute', marginLeft: '16px', marginTop: '13px' }} />
                                    <StyledDescription
                                        aria-label="empty textarea"
                                        placeholder="Description"
                                        minRows={'1'}
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                        required
                                        name='description'

                                    />
                                </Box>
                                <TextField

                                    name='stock'
                                    value={stock}
                                    onChange={(e) => setstock(e.target.value)}
                                    type={'number'}
                                    placeholder='Stock'
                                    required

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Storage sx={{ paddingLeft: '6px', paddingRight: '6px' }} />
                                            </InputAdornment>
                                        )
                                    }} />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        name='category'
                                        MenuProps={MenuProps}
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setcategory(e.target.value)}
                                    >
                                        {categories.map((value, i) => (
                                            <MenuItem value={value} key={i}>{value}</MenuItem>
                                        ))}


                                    </Select>
                                </FormControl>


                              {oldImages &&  <Box display={'flex'} justifyContent='center' gap='10px' flexWrap={'wrap'}>
                                    { oldImages.map((item, i) => {
                                        return <Box component={'img'} src={item.url} width='80px' key={i}></Box>
                                    })}
                                </Box> }

                                <Box display={'flex'} alignItems='center'>
                                    <InputFilecreate
                                        component={'input'}
                                        label="images"
                                      
                                        name='images'
                                        onChange={updateProductImagesChange}
                                        multiple
                                        type={'file'}
                                    ></InputFilecreate>
                                </Box>


                              {imagesPreview &&  <Box display={'flex'} justifyContent='center' gap='10px' flexWrap={'wrap'}>
                                    { imagesPreview.map((item, i) => {
                                        return <Box component={'img'} src={item} width='80px' key={i}></Box>
                                    })}
                                </Box> }
                                <Button variant="contained" type='submit' sx={{  width: '100%' }}>Update</Button>

                            </Box>
                        </FormContainercreate>
                    </StyledBoxcreate>}
                </Box>
                </Box>
            </Box>
        </>
    )
}

export default UpdateProduct