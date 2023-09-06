import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { fetchProducts } from '../../../redux/features/productSlice'




const SellerStore = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state)=>state.product.products)
    console.log(products)
    const seller = useAppSelector((state)=>state.seller.seller)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[])
 

  return (
    <Stack direction={'row'} m={'6rem'} gap={'4rem'}>
        <Box></Box>
        <Box>
            
        </Box>
    </Stack>
  )
}

export default SellerStore