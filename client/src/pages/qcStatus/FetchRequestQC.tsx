import React, { useEffect, useState } from "react";
import { Product, fetchSellerProducts } from "../../redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box } from "@mui/material";
import { useAuth } from "../context/useAuth";
import StickyHeadTable from "../../components/QCstatusComponent";
// RequestQC component
const RequestQC: React.FC = () => {
  const products = useAppSelector(state=>state.product.products)
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const sellerId = auth?.user?._id;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchSellerProducts(sellerId))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch seller products:", error);
          setLoading(false);
        });
    }
  }, [sellerId, dispatch]);

  useEffect(() => {
    if (!loading) {
      const filtered = products.filter((product) => product?.qcStatus === "Progress");
      setFilteredProducts(filtered);
    }
  }, [loading, products]);

  return (
    <Box marginBottom={"30%"}>
      {loading ? (
        // Display a loading indicator here
        <div>Loading...</div>
      ) : (
        <StickyHeadTable products={filteredProducts} />
      )}
    </Box>
  );
};
export default RequestQC
