import React from "react";
import { Box } from "@mui/material";
import banner from "../../assets/bgbgg.jpg";
import FetchCategory from "../../pages/home/category/FetchCategory";
import Search from "../Search";

const Banner: React.FC = () => {
  return (
    <>
      <Box>
        <Box ml={'8rem'} >
          <FetchCategory />
        </Box>

        <Box width={"100%"} mt={'-6.2rem'}> 
          <img
            style={{ width: "100%", height: "100vh", objectFit: "fill" }}
            src={banner}
            alt="banner"
          />
        </Box>
        <Box>
            <Search />
        </Box>
      </Box>
    </>
  );
};

export default Banner;
