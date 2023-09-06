import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchCategoryFilterProducts,
  fetchProducts,
} from "../../../redux/features/productSlice";
import { ProductCardComponent } from "../../../components/productComponent/ProductCard";

const DropdownMenu = styled(Box)({
  position: "absolute",
  zIndex: 1,
  borderRadius: "1rem",
  backgroundColor: "#443f40a2",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  padding: "10px",
  minWidth: "200px",
});

const SelectCategoryProduct: React.FC = () => {
  const [sortOptionsShow, setSortOptionsShow] = useState<boolean>(false);
  const [brandOptionsShow, setBrandOptionsShow] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const sortRef = useRef<HTMLLIElement | null>(null);
  const brandRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  // Use useSelector to access the products from the Redux store
  const products = useAppSelector((state) => state.product.products);

  // Fetch seller products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => product.brand);
  const categories = useAppSelector((state) => state.category.categories);
  const categoryId = useAppSelector((state) => state.category.selectedCategory);

  // Find the selected category by categoryId
  const selectedCategory = categories.find(
    (category) => category._id === categoryId
  );

  console.log(selectedCategory);
  console.log(products);

  // Create a set of unique brand names
  const uniqueBrandNames = [
    ...new Set(filteredProducts.map((item) => item.brand)),
  ];

  const handleClickOption = () => {
    if (sortRef.current) {
      // Calculate the position of the menu relative to the "Sort" li element
      const rect = sortRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    // Toggle the value of sortOptionsShow when the Sort is clicked
    setSortOptionsShow(!sortOptionsShow);
  };

  const handleClickBrand = () => {
    if (brandRef.current) {
      // Calculate the position of the menu relative to the "Brands" button
      const rect = brandRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    // Toggle the value of brandOptionsShow when the Brands button is clicked
    setBrandOptionsShow(!brandOptionsShow);
  };

  useEffect(() => {
    // Fetch products when the selected category changes
    if (categoryId) {
      dispatch(fetchCategoryFilterProducts(categoryId));
    }
  }, [dispatch, categoryId]);

  return (
    <Box mt={"10rem"}>
      <Stack justifyContent={"space-around"} direction={"row"}>
        <Typography
          variant="h2"
          component="h4"
          fontWeight={"bold"}
          color="black"
        >
          {selectedCategory ? selectedCategory.label : ""}{" "}
          Products
        </Typography>
        <li onClick={handleClickOption} ref={sortRef}>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "gray" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
          >
            Sort
          </Typography>
        </li>
      </Stack>
      <Box m={"4rem 6rem"} display={"flex"} gap={"7rem"}>
        <Stack>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "gray" } }}
            fontSize={"3.5rem"}
            fontWeight={600}
            color="black"
          >
            Category
          </Typography>
        
          <Button
            onClick={handleClickBrand}
            variant="text"
            sx={{ fontSize: "3rem", color: "black", fontWeight: 600 }}
            ref={brandRef}
          >
            Brands
          </Button>
          <ul>
            {brandOptionsShow && (
              <DropdownMenu
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left - 50,
                  position: "static",
                  cursor: "pointer",
                }}
                onClick={handleClickBrand}
              >
                {uniqueBrandNames.map((brandName) => (
                  <li key={brandName}>{brandName}</li>
                ))}
              </DropdownMenu>
            )}
          </ul>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "gray" } }}
            fontSize={"3.5rem"}
            fontWeight={600}
            color="black"
          >
            Ratings
          </Typography>
        </Stack>
        <Box>
          <ProductCardComponent products={products} />
        </Box>
      </Box>
      {sortOptionsShow && (
        <DropdownMenu
          style={{ top: menuPosition.top, left: menuPosition.left - 50 }}
          onClick={handleClickOption}
        >
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "white" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
          >
            Popularity
          </Typography>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "white" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
          >
            Price - High to Low
          </Typography>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "white" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
          >
            Price - Low to High
          </Typography>
        </DropdownMenu>
      )}
    </Box>
  );
};

export default SelectCategoryProduct;
