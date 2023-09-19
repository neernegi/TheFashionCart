import React, { useState } from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled(Box)({
  width: "26rem",
  height: "4rem",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f2f2f2",
  padding: "4px 4px",
  borderRadius: "4px",
});

const SearchInput = styled(InputBase)({
  marginLeft: "8px",
});

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onSearchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/serach-products/${keyword}`);
    }
  };
  return (
    <Box>
      <form onSubmit={onSearchHandler}>
        <SearchContainer>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <SearchInput
            type="text"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchContainer>
      </form>
    </Box>
  );
};

export default Search;
