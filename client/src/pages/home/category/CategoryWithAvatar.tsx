import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "../../../redux/features/categorySlice";
import { Box, Stack, Typography } from "@mui/material";
import catProduct from "../../../assets/productcat.jpg";
import categoryIcon from "../../../assets/category.png";
import { Link } from "react-router-dom";

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
    <Box mt={"2rem"}>
      <Stack justifyContent={"center"} gap={"2rem"} direction={"row"}>
        {categories.map((item) => (
          <Box key={item._id} style={{ position: "relative" }}>
            <Box
              sx={{ cursor: "pointer" }}
              borderRadius={"50%"}
              bgcolor={"gray"}
              p={"1.5rem"}
              onClick={() => handleCategoryClick(item.label)} // Pass the category label as a string
            >
              <img
                style={{ width: "10vh", height: "10vh" }}
                src={item.avatar?.url}
              />
            </Box>

            <Typography
              sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
              variant="h2"
              component="h4"
              fontWeight={"bold"}
              color="black"
              onClick={() => handleCategoryClick(item._id)}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
        <Box>
          <Box
            sx={{ cursor: "pointer" }}
            borderRadius={"50%"}
            bgcolor={"GrayText"}
            p={"1.5rem"}
            onClick={() => handleCategoryClick("All Category")} // Pass the category label as a string
          >
            <img
              style={{ width: "10vh", height: "10vh" }}
              src={categoryIcon}
              alt="all category"
            />
          </Box>
          <Link to={"/show-all-category"}>
            <Typography
              sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
              variant="h2"
              component="h4"
              fontWeight={"bold"}
              color="black"
            >
              All Category
            </Typography>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default CategoryWithAvatar;
