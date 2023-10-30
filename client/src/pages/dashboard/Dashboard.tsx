import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import orderIcon from "../../assets/shopping-bag (1).png";

const Dashboard: React.FC = () => {
  return (
    <Stack ml={"15%"} mt={"3%"}>
      <Box>
        <Box>
          <Box display={"flex"} gap={"4rem"}>
            <img style={{ width: "8rem" }} src={orderIcon} alt="orderIcon" />
            <Typography  style={{fontSize:"4rem"}}  alignSelf={'center'} fontWeight={'700'} color="textPrimary">
              232
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
