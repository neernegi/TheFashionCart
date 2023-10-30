import React, { useState } from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled(Box)({
  width: "45%",
  height: "8rem",
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",

  padding: "4px 4px",
  borderRadius: "1.4rem",
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
    <>
      <Box ml={"18%"} mt={"-18%"} position={"absolute"}>
        <form onSubmit={onSearchHandler}>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search your product here"
              onChange={(e) => setKeyword(e.target.value)}
              style={{ backgroundColor: "white", width: "100vh",fontSize:"3rem" }}
            />
            <IconButton
              style={{
                backgroundColor: "blueviolet",
                borderTopRightRadius: "1.4rem",
                borderBottomRightRadius: "1.4rem",
                padding:"1rem 1rem 1rem 1rem",
                marginRight:"-4px"
                
              }}
            >
              <SearchIcon style={{ fontSize: "6rem", color: "white" }} />
            </IconButton>
          </SearchContainer>
        </form>
      </Box>
    </>
  );
};

export default Search;
