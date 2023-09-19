import React from "react";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import defaultAvatar from "../../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import "./style.css"; // Import the custom CSS

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface ReviewProps {
  review: Review;
}

const ReviewCardComponent: React.FC<ReviewProps> = ({ review }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignSelf={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        gap={"1rem"}
        marginBottom={"1rem"}
        alignSelf={"center"}
        alignItems={"center"}
      >
        <Avatar
          src={defaultAvatar}
          alt="neeraj"
          sx={{ width: "6rem", height: "6rem" }}
        />
        <Typography sx={{ fontSize: "3rem", color: "black" }} variant="h3">
          {review?.name}
        </Typography>
        <Rating
          name="simple-controlled"
          value={review?.rating}
          readOnly
          precision={0.5}
          size="large"
        />
      </Box>
      <Typography sx={{ fontSize: "2rem", color: "black" }} variant="h5">
        {review?.comment}
      </Typography>
    </Box>
  );
};

export default ReviewCardComponent;
