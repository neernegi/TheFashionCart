import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
  setSelectedSubcategory,
} from "../../redux/features/categorySlice";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const DropdownMenu = styled(Box)({
  position: "absolute",
  top: 75,
  zIndex: 2,
  borderRadius: "1rem",
  backgroundColor: "#443f40a2",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  padding: "10px",
  minWidth: "200px",
});

const FetchCategory: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const category = useAppSelector((state) => state.category.categories);
  console.log(category);
  const dispatch = useAppDispatch();

  const handleCategoryClick = (categoryId: string) => {
    // Removed '<CategoryProp>' from the argument type

    dispatch(setSelectedCategory(categoryId));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []); // Use an empty array as the dependency to run the effect only once

  const handleOnMouseEnter = (categoryId: string) => {
    setHoveredCategory(categoryId);
  };

  console.log(category);

  const handleOnMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <Box mt={"5rem"}>
      <Stack justifyContent={"center"} gap={"2rem"} direction={"row"}>
        {category.map((item) => (
          <div
            key={item._id}
            onMouseEnter={() => handleOnMouseEnter(item._id)}
            onMouseLeave={handleOnMouseLeave}
            style={{ position: "relative" }}
            onClick={() => handleCategoryClick(item._id)}
          >
            <Link to={"/fetch-all-get-category-products"}>
              <img src={item.avatar?.url} alt={item?.name} />
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
            </Link>
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default FetchCategory;
