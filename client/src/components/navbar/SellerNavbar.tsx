import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/context/useAuth";

const NavBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "6rem",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",
  alignSelf: "center",
  position: "relative",
});

const LinkNav = styled(Link)({
  color: "black",
  fontWeight: "500",
  fontSize: "3rem",
  textDecoration: "none",
  ":hover": {
    color: "blue",
  },
});

const DropdownMenu = styled(Box)({
  position: "absolute",
  top: 98,
  zIndex: 1,
  borderRadius: "1rem",
  backgroundColor: "#443f40a2",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  padding: "10px",
  minWidth: "200px",
});

const SellerNavbar: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({
    qcstatus: false,
    listing: false,
    order: false,
  });
  

  const handleMouseEnter = (link: string) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [link]: true,
    }));
  };

  const handleMouseLeave = (link: string) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [link]: false,
    }));
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("logout successfully");
  };

  return (
    <>
      <NavBox>
        <LinkNav to={"/seller-store"}>E-Seller</LinkNav>
        <LinkNav to={"/seller-store"}>Home</LinkNav>
        {/* <LinkNav to={"/seller-add-info"}>Add Detail</LinkNav> */}

        <LinkNav
          to={"/add-products"}
        
        >
          Listing
        </LinkNav>

        <LinkNav
          to={"/seller-products"}
     
        >
          QC Status
        </LinkNav>

        <LinkNav
          to={"/seller-order"}
          onMouseEnter={() => handleMouseEnter("order")}
          onMouseLeave={() => handleMouseLeave("order")}
        >
          Order
        </LinkNav>

        <LinkNav to={"/profile"}>Profile</LinkNav>
        <LinkNav to={"/logout"} onClick={handleLogout}>
          Logout
        </LinkNav>
      </NavBox>
     
      

    </>
  );
};

export default SellerNavbar;
