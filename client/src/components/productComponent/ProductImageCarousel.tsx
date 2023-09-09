import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

type ProductImageCarouselProps = {
  images: ImageProps[]; // Define the images prop here
};

type ImageProps = {
  public_id: string;
  url: string;
  _id: string;
};

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
}) => {
  // Check if images is undefined or empty before using it
  if (!images || images.length === 0) {
    return null; // or return some other fallback content if necessary
  }

  return (
    <Box >
      <Carousel sx={{width:"50rem"}}>
        {images &&
          images.map((image, i) => (
            <img
            style={{width:"100%",height:"40rem"}}
              className="CarouselImage"
              key={image._id}
              src={image.url}
              alt={`${i} Slide`}
            />
          ))}
      </Carousel>
    </Box>
  );
};

export default ProductImageCarousel;
