import { Box } from "@mui/material";
import React from "react";
import FetchCategory from "./category/FetchCategory";

import ShowBanner from "./banner/ShowBanner";
import CategoryWithAvatar from "./category/CategoryWithAvatar";
import SelectCategoryProduct from "./category/SelectCategoryProduct";
import { ProductSwiper } from "../../components/swiper/ProductSwiper";


const Home: React.FC = () => {
  return (
    <Box>
      <FetchCategory />
      <ShowBanner />
      <CategoryWithAvatar />
      <SelectCategoryProduct />
      <ProductSwiper />
    </Box>
  );
};

export default Home;
