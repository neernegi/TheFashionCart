import React from "react";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import avatar from "../../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg";


interface Review {
    name:string,
    rating:number,
    comment:string
}

interface ReviewProps {
    review:Review
}

const ReviewCardComponent:React.FC<ReviewProps> = ({review}) => {


    const options = {
        edit :false,
        color:'rgba(20,20,20,0.1',
        activeColor:'tomato',
        size:window.innerWidth<600?20:25,
        value:review.rating,
        isHalf:true,
    }


  return (
    <Box display={'flex'} flexDirection={'column'} alignSelf={'center'} alignItems={'center'}>
      <Box display={"flex"} gap={"1rem"} marginBottom={"1rem"} alignSelf={'center'} alignItems={'center'}>
        <Avatar src={avatar} alt="neeraj" sx={{ width: '6rem', height: '6rem' }} />
        <Typography fontSize={'3rem'} color={"black"} variant="h3">
          {review?.name}
        </Typography>
        <Rating name="size-medium" value={review?.rating} />
      </Box>
      <Typography fontSize={'2rem'}  color={"black"}  variant="h5">
        {review?.comment}
      </Typography>
    </Box>
  );
};

export default ReviewCardComponent;
