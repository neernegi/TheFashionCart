import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchBanner } from "../../../redux/features/bannerSlice";
import ImageSwiper from "../../../components/swiper/Carousel";



const ShowBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const banner = useAppSelector((state) => state.banner.banners);
  console.log(banner);
  
  useEffect(() => {
    dispatch(fetchBanner());
  }, []);

  return (
    <Box>
      <ImageSwiper banner={banner} />
    </Box>
  );
};

export default ShowBanner;
