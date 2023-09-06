import { Box, typography } from "@mui/system";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCategories } from "../../redux/features/categorySlice";
import Typography from "@mui/material/Typography";

const ShowAllCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <Box
      m={"10rem"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"row"} gap={'4rem'}
    >
      {categories.map((item) => (
        <Box key={item._id}>
          <img style={{cursor:'pointer'}} src={item.avatar?.url} alt={item?.name} />
          <Typography style={{cursor:"pointer"}} variant="h3" color={"black"}>
            {item?.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ShowAllCategory;
