import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Product } from "../../redux/features/productSlice";
import { Rating, styled } from "@mui/material";
import { Link } from "react-router-dom";

// Define the styled components
// const ProductContainer = styled(Box)({});

// const ProductCard = styled(Card)({
//   flexBasis: "calc(25% - 16px)", // Adjust width to fit 4 products per row
//   // Set a minimum width to prevent very narrow cards
//   maxWidth: "100rem",
// });

export const ProductCardComponent = ({ products }: { products: Product[] }) => {
  return (
    <Box >
      {products.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: '4rem',
            ml:"4rem",
            mt:"5rem"
          }}
        >
          {products.map((product: Product) => (
            <Box key={product?._id}>
              {/* Display the first image from the images array */}
              {product?.avatar?.length > 0 && (
                <Box key={product?.avatar[0]?.public_id}>
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
                </Box>
              )}
              <Box>
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
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="h2" component="h4" fontWeight="bold" color="black">
          No products
        </Typography>
      )}
    </Box>
  );
};

export default ProductCardComponent;
