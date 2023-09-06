import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Typography } from "@mui/material";
import "./style.css";

const slider = [
  {
    image:
      "https://www.chardhamtours.in/gallery/cityImage/1507096762_Roopkund.jpg",
    title: "Roopkund",
  },
  {
    image:
      "https://prismic-io.s3.amazonaws.com/indiahike/1e602c59-bdd0-49a6-ba8e-0de877e32793_Ali+Bedni_AB_Roopkund_Sadguru+Prajapati_Bedni+Meadows_Mt.trisul_.jpg",
    title: "Bedani Bugyal",
  },
  {
    image:
      "https://curlytales.com/wp-content/uploads/2022/08/Uttarakhand-in-India-is-home-to-such-beautiful-astro-villages-which-you-surely-should-visit.-2.jpg",
    title: "Benital",
  },
  {
    image:
      "https://trekthehimalayas.com/wp-content/uploads/2021/12/Kedarkantha-5.jpg",
    title: "Kedarkhanta",
  },
  {
    image:
      "https://www.euttaranchal.com/tourism/timthumb.php?src=https://www.euttaranchal.com/tourism/photos/khirsu-1164061.jpg&w=500&h=300&q=50",
    title: "Khirsu",
  },
  {
    image: "https://soulitude.in/wp-content/uploads/Khurpatal.jpg",
    title: "Khurpatal",
  },
  {
    image:
      "https://www.euttaranchal.com/tourism/timthumb.php?src=https://www.euttaranchal.com/tourism/photos/hanol-mahasu-devta-temple-7698411.jpg&w=750&h=510&q=50",
    title: "Mahsu Devta",
  },
  {
    image:
      "https://uttarakhandtourism.gov.in/sites/default/files/2021-02/Skiing%2C%20Auli_1.jpg",
    title: "Auli",
  },
];

export const ProductSwiper = () => {
  const slidesPerView = window.innerWidth <= 768 ? 2 : 5;
//   const spaceBetween = window.innerWidth <= 768 ? 20 : 10;

  // Check if slider is undefined or null before using it
  if (!slider) {
    return null; // or return some other fallback content if necessary
  }

  return (
    <Box bgcolor={'cadetblue'} p={'2rem'}>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
      >
        {slider.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={'1rem'}
              marginBottom="4rem"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  borderRadius: "22px",
                  width: "40rem",
                  height: "35rem",
                }}
              />
              <Typography variant="h4" component="h3" color="textPrimary">
                {item.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
