import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Product } from "../../redux/features/productSlice";
import { Pagination, Rating, styled } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const ProductContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "4rem",
  ml: "4rem",
  mt: "5rem",
  mb: "5rem",
  justifyContent: "center", // Center the products
});

const ProductCard = styled(Card)({
  flexBasis: "calc(32.33% - 16px)", // Display 3 products per row
  maxWidth: "100rem",
});

export const ProductCardComponent = ({ products }: { products: Product[] }) => {
  const [page, setPage] = useState(1);
  const productsPerPage = 6; // Display 6 products per page
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);
  const CustomPagination = styled(Pagination)({
    display: "flex",
    justifyContent: "center",
    "& .MuiPaginationItem-root": {
      fontSize: "2.4rem",
      padding:"1.4rem"
    },
    "& .MuiPaginationItem-previous, & .MuiPaginationItem-next": {
      fontSize: "2.4rem", 
      color:"red"
    },
  });
  return (
    <Box>
      {totalProducts > 0 ? (
        <>
          <ProductContainer>
            {visibleProducts.map((product: Product) => (
              <Box key={product?._id}>
                {product?.avatar?.length > 0 && (
                  <Link to={`/single-product-detail/${product?._id}`}>
                    <img
                      style={{
                        width: "55rem",
                        height: "55rem",
                        objectFit: "fill",
                        borderRadius: "2rem",
                      }}
                      src={product?.avatar[0]?.url}
                      alt={product?.name}
                    />
                  </Link>
                )}
                <CardContent>
                  <Typography
                    mt={"2rem"}
                    variant="h2"
                    fontSize={"3rem"}
                    component="body"
                    color="black"
                  >
                    {product?.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontSize={"3rem"}
                    color="black"
                    fontWeight={600}
                  >
                    ₹{product?.price}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontSize={"3rem"}
                    color="black"
                  >
                    {product?.brand}
                  </Typography>

                  <Rating
                    name="simple-controlled"
                    value={product?.ratings}
                    readOnly
                    precision={0.5}
                    size="large"
                  />
                </CardContent>
              </Box>
            ))}
          </ProductContainer>
          <CustomPagination
            color="primary"
            size="large"
            style={{ marginTop: "7rem" }}
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <Typography variant="h2" component="h4" fontWeight="bold" color="black">
          No products
        </Typography>
      )}
    </Box>
  );
};
