import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Product } from "../../redux/features/productSlice";
import { Rating, styled } from "@mui/material";
import { Link } from "react-router-dom";

// Define the styled components
const ProductContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: 2, // Adjust the gap between products
  justifyContent: "space-between", // Distribute space between products
});

const ProductCard = styled(Card)({
  flexBasis: "calc(25% - 16px)", // Adjust width to fit 4 products per row
  // Set a minimum width to prevent very narrow cards
  maxWidth: "100rem",
});

export const ProductCardComponent = ({ products }: { products: Product[] }) => {
  return (
    <Box>
      {products.length > 0 ? (
        <ProductContainer>
          {products.map((product: Product) => (
            <ProductCard key={product._id}>
              {/* Display the first image from the images array */}
              {product.images.length > 0 && (
                <Box key={product.images[0]?.public_id}>
                  <Link to={`/single-product-detail/${product._id}`}>
                    <img
                      style={{
                        width: "100%",
                        height: "30%",
                        objectFit: "contain",
                      }}
                      src={product.images[0].url}
                      alt={product?.name}
                    />
                  </Link>
                </Box>
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="black"
                >
                  {product?.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="black"
                >
                  {product?.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product?.description}
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={product?.ratings}
                  readOnly
                  precision={0.5}
                  size="large"
                />
              </CardContent>
            </ProductCard>
          ))}
        </ProductContainer>
      ) : (
        <Typography variant="h2" component="h4" fontWeight="bold" color="black">
          No products
        </Typography>
      )}
    </Box>
  );
};

export default ProductCardComponent;
