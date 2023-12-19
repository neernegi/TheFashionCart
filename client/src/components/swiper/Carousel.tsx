import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import 'swiper/css/autoplay'
import { Box } from "@mui/material";
import { Navigation,Autoplay} from "swiper/modules";

type BannerProps = {
  banner: {
    image: {
      public_id: string;
      url: string;
    };
    _id: string;
  }[];
};

const ImageSwiper: React.FC<BannerProps> = ({ banner }) => {
  
  if (!banner || banner.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Navigation,Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500 }}
    >
      {banner.map((item) => (
        <SwiperSlide key={item._id}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1rem"
            marginBottom={"4rem"}
          >
            <img
              src={item.image?.url}
              alt={item._id}
              style={{
                width: "100%",
                height: "40vh",
                borderRadius: "22px",
              }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
