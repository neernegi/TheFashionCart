import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "../../../redux/features/categorySlice";
import { Box, Stack, Typography } from "@mui/material";
// import catProduct from "../../../assets/productcat.jpg";
// import categoryIcon from "../../../assets/category.png";
// import { Link } from "react-router-dom";

const CategoryWithAvatar: React.FC = () => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const categories = useAppSelector((state) => state.category.categories); // Renamed 'category' to 'categories'
  console.log(categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    // Removed '<CategoryProp>' from the argument type
    setShowCategory(true);
    dispatch(setSelectedCategory(categoryId));
    setShowCategory(false);
  };

  return (
    <Box mt={"8rem"} ml={"20%"}>
      <Stack gap={"7rem"} direction={"row"}>
        {categories.map((item) => (
          <Box
            // marginLeft={"6rem"}
            textAlign={"center"}
            key={item?._id}
            style={{ position: "relative" }}
          >
            <Box
              // onClick={() => handleCategoryClick(item.label)} // Pass the category label as a string
              onClick={() => handleCategoryClick(item?._id)}
            >
              <img
                style={{
                  width: "10vh",
                  height: "10vh",
                  borderRadius: "10rem",
                  cursor: "pointer",
                }}
                src={item?.avatar?.url}
              />
            </Box>

            <Typography
              sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
              fontSize={"3rem"}
              color="black"
              onClick={() => handleCategoryClick(item?._id)}
            >
              {item?.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryWithAvatar;
