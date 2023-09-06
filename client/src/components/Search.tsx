import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

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
  return (
    <Box>
      <SearchContainer>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <SearchInput placeholder="Search" />
      </SearchContainer>
    </Box>
  );
};

export default Search;
