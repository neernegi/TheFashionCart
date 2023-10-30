import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Slider, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  Product,
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
  const [ratingOptionsShow, setRatingOptionsShow] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([500, 50000]);
  const stepSize = 3000;

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const sortRef = useRef<HTMLLIElement | null>(null);
  const brandRef = useRef<HTMLButtonElement | null>(null);
  const ratingRef = useRef<HTMLButtonElement | null>(null);

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
  const handleClickRatingShow = () => {
    if (ratingRef.current) {
      // Calculate the position of the menu relative to the "Brands" button
      const rect = ratingRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    // Toggle the value of brandOptionsShow when the Brands button is clicked
    setRatingOptionsShow(!ratingOptionsShow);
  };

  const handleBrandHandler = (brandName: string) => {
    setSelectedBrand(brandName); // Set the selected brand
  };

  const sortProducts = (order: string) => {
    let sorted = [...products];
    if (order === "lowToHigh") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (order === "popularity") {
      sorted = sorted.sort((a, b) => b.ratings - a.ratings);
    } else if (order === "4star") {
      // Filter products with 4 or more stars
      sorted = sorted.filter((product) => product.ratings >= 4);
    } else if (order === "3star") {
      // Filter products with 3 or more stars
      sorted = sorted.filter((product) => product.ratings >= 3);
    } else if (order === "2star") {
      // Filter products with 2 or more stars
      sorted = sorted.filter((product) => product.ratings >= 2);
    }
    setSortedProducts(sorted);
    setSortOrder(order);
  };

  useEffect(() => {
    // Fetch products when the selected category changes
    if (categoryId) {
      dispatch(fetchCategoryFilterProducts(categoryId));
    }
  }, [dispatch, categoryId]);

  const filteredProductsByBrand = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  const filterProductsByPrice = (products: Product[], priceRange: number[]) => {
    const [minPrice, maxPrice] = priceRange;
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

  return (
    <Box mt={"10rem"}>
      <Stack justifyContent={"space-around"} direction={"row"}>
        <Typography
          variant="h2"
          component="h4"
          fontWeight={"bold"}
          color="black"
        >
          {selectedCategory ? selectedCategory.label : ""} Products
        </Typography>
        {/* <li onClick={handleClickOption} ref={sortRef}>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "gray" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
          >
            Sort
          </Typography>
        </li> */}
      </Stack>
      <Box m={"4rem 6rem"} display={"flex"} gap={"22rem"}>
        <Stack>
          <Box sx={{ width: 300 }} m={"0.5rem"}>
            <Typography fontSize={"3.4rem"} fontWeight={600} color="black">
              Price
            </Typography>
            <Slider
              aria-label="Price Range"
              value={priceRange}
              step={stepSize}
              min={500}
              max={50000}
              valueLabelDisplay="auto"
              onChange={(_, newValue) => setPriceRange(newValue as number[])}
            />
          </Box>
          <Button
            onClick={handleClickBrand}
            variant="text"
            sx={{
              fontSize: "3rem",
              color: "black",
              fontWeight: 600,
              marginLeft: "-5rem",
              mt: "1rem",
            }}
            ref={brandRef}
          >
            Brands
          </Button>
          <ul>
            <DropdownMenu
              style={{
                top: menuPosition.top,
                left: menuPosition.left - 50,
                position: "static",
                marginLeft: "-2rem",
                backgroundColor: "white",
              }}
            >
              {uniqueBrandNames.map((brandName) => (
                <Typography
                  color={"black"}
                  sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
                  fontSize={"2rem"}
                  fontWeight={550}
                  key={brandName}
                  onClick={() => handleBrandHandler(brandName)}
                >
                  {brandName}
                </Typography>
              ))}
            </DropdownMenu>
          </ul>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "gray" } }}
            fontSize={"3.5rem"}
            fontWeight={600}
            color="black"
            mt={"2rem"}
            onClick={handleClickRatingShow}
            ref={ratingRef}
          >
            Ratings
          </Typography>
          {ratingOptionsShow && (
            <DropdownMenu
              style={{
                top: menuPosition.top,
                left: menuPosition.left - 50,
                position: "static",
                backgroundColor: "white",
              }}
            >
              <Typography
                sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
                fontSize={"2.4rem"}
                fontWeight={550}
                color="black"
                onClick={() => sortProducts("4star")}
              >
                4★ & above
              </Typography>
              <Typography
                sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
                fontSize={"2.4rem"}
                fontWeight={550}
                color="black"
                onClick={() => sortProducts("3star")}
              >
                3★ & above
              </Typography>
              <Typography
                sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
                fontSize={"2.4rem"}
                fontWeight={600}
                color="black"
                onClick={() => sortProducts("2star")}
              >
                2★ & above
              </Typography>
            </DropdownMenu>
          )}
        </Stack>
        <ProductCardComponent products={products} />
        {/* <Box>
          <ProductCardComponent products={products}
            // products={
            //   selectedBrand
            //     // ? filteredProductsByBrand
            //     : sortOrder
            //     ? filterProductsByPrice(sortedProducts, priceRange)
            //     : filterProductsByPrice(products, priceRange)
            // }
          />
        </Box> */}
      </Box>
      {/* {sortOptionsShow && (
        <DropdownMenu
          style={{ top: menuPosition.top, left: menuPosition.left - 50 }}
          onClick={handleClickOption}
        >
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "white" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
            onClick={() => sortProducts("popularity")}
          >
            Popularity
          </Typography>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "white" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
            onClick={() => sortProducts("highToLow")}
          >
            Price - High to Low
          </Typography>
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: "white" } }}
            fontSize={"2.5rem"}
            fontWeight={500}
            color="black"
            onClick={() => sortProducts("lowToHigh")}
          >
            Price - Low to High
          </Typography>
        </DropdownMenu> */}
      {/* )} */}
    </Box>
  );
};

export default SelectCategoryProduct;
