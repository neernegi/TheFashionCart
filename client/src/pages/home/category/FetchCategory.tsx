import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchCategories } from "../../../redux/features/categorySlice";
import { styled } from "@mui/system";

const DropdownMenu = styled(Box)({
  position: "absolute",
  top: 98,
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, []); // Use an empty array as the dependency to run the effect only once

  const handleOnMouseEnter = (categoryId: string) => {
    setHoveredCategory(categoryId);
  }

  const handleOnMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <Box mt={"5px"}>
      <Stack justifyContent={"center"} gap={"2rem"} direction={"row"}>
        {category.map((item) => (
          <div
            key={item._id}
            onMouseEnter={() => handleOnMouseEnter(item._id)}
            onMouseLeave={handleOnMouseLeave}
            style={{ position: "relative" }}
          >
            <Typography
              sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
              variant="h2"
              component="h4"
              fontWeight={"bold"}
              color="black"
            >
              {item.label}
            </Typography>
            {hoveredCategory === item._id && (
              <DropdownMenu ml={"2rem"}>
                <ul>
                  {item.subCategories.map((subcat) => (
                    <li key={subcat._id}>{subcat.name}</li>
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
