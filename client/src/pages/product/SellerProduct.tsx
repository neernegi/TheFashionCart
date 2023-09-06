import React, { useEffect } from "react";
import { fetchSellerProducts } from "../../redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box } from "@mui/material";
import { useAuth } from "../context/useAuth";
import StickyHeadTable from "../../components/QCstatusComponent";


const SellerProducts: React.FC = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();

  // Use useSelector to access the products from the Redux store
  const products = useAppSelector((state) => state.product.products);

  const sellerId = auth?.user?._id;

  // Fetch seller products when the component mounts
  useEffect(() => {
    if (sellerId) {
      dispatch(fetchSellerProducts(sellerId));
    }
  }, [dispatch, sellerId]);

  return (
    <Box>
      <StickyHeadTable products={products} />
    </Box>
  );
};

export default SellerProducts;
