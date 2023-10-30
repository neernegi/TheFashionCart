import { Box } from "@mui/material";
import React from "react";
import FetchCategory from "./category/FetchCategory";

import ShowBanner from "./banner/ShowBanner";
import CategoryWithAvatar from "./category/CategoryWithAvatar";
import SelectCategoryProduct from "./category/SelectCategoryProduct";
import { ProductSwiper } from "../../components/swiper/ProductSwiper";
import { useAuth } from "../context/useAuth";
import Banner from "../../components/Home/Banner";

const Home: React.FC = () => {
  const { auth } = useAuth();
  const isAdmin = auth?.user?.role==="admin"
  const isSeller = auth?.user?.role==="seller"

  return (
    <Box>
      {!isAdmin && !isSeller && (
        <Box>
          {/* <FetchCategory /> */}
          <Banner />
          {/* <ShowBanner /> */}
          <CategoryWithAvatar />
          <SelectCategoryProduct />
          <ProductSwiper />
        </Box>
      )}
    </Box>
  );
};

export default Home;
