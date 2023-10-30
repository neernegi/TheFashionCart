import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
  setSelectedSubcategory,
} from "../../../redux/features/categorySlice";
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
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const category = useAppSelector((state) => state.category.categories);
  console.log(category);
  const dispatch = useAppDispatch();

  const handleCategoryClick = (categoryId: string) => {
    // Removed '<CategoryProp>' from the argument type

    dispatch(setSelectedCategory(categoryId));
  };
  const handleSubcategoryClick = (categoryId: string) => {
    // Removed '<CategoryProp>' from the argument type

    dispatch(setSelectedSubcategory(categoryId));
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
    <Box mt={"1.8rem"}>
      <Stack gap={"4rem"} direction={"row"}>
        {category.map((item) => (
          <div
            key={item._id}
            onMouseEnter={() => handleOnMouseEnter(item._id)}
            onMouseLeave={handleOnMouseLeave}
            style={{ position: "relative" }}
            onClick={() => handleCategoryClick(item._id)}
          >
            <Link to={"/fetch-all-get-category-products"}>
              <Typography
                sx={{ cursor: "pointer", ":hover": { color: "ActiveBorder" } }}
                variant="h2"
              
                component="h4"
                fontWeight={"bold"}
                color="black"
                onClick={() => handleCategoryClick(item._id)}
              >
                {item.label}
              </Typography>
            </Link>

            {hoveredCategory === item._id && (
              <DropdownMenu
                ml={"2rem"}
                onClick={() => handleCategoryClick(item._id)}
              >
                <ul>
                  {item.subCategories.map((subcat) => (
                    <li
                      onClick={() => handleSubcategoryClick(subcat._id)}
                      key={subcat._id}
                    >
                      <Link
                        to={"/fetch-all-get-subcategory-products"}
                        onClick={() => handleSubcategoryClick(subcat._id)}
                      >
                        <Typography
                        fontSize={'2.5rem'}
                        fontWeight={600}
                        color={'white'}
                          sx={{ ":hover": { color: "black" } }}
                          key={subcat?._id}
                        >
                          {" "}
                          {subcat.name}
                        </Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </DropdownMenu>
            )}
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default FetchCategory;
