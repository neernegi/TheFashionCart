import React, { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/context/useAuth";

const NavBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "3rem",
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

const AdminNavbar: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({
    qcstatus: false,
    banner: false,
    category: false,
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
        <LinkNav to={"/qc-product"}>QC Status</LinkNav>

        <LinkNav
          to={"/banner"}
          onMouseEnter={() => handleMouseEnter("banner")}
          onMouseLeave={() => handleMouseLeave("banner")}
        >
          Banner
        </LinkNav>

        <LinkNav
          to={"/category"}
          onMouseEnter={() => handleMouseEnter("category")}
          onMouseLeave={() => handleMouseLeave("category")}
        >
          Category
        </LinkNav>

        <LinkNav
          to={"/order"}
          onMouseEnter={() => handleMouseEnter("order")}
          onMouseLeave={() => handleMouseLeave("order")}
        >
          Order
        </LinkNav>

        <LinkNav to={"/profile"}>Profile</LinkNav>
        <Button onClick={handleLogout}>Logout</Button>
      </NavBox>
      {showDropdown.qcstatus && (
        <DropdownMenu
          left={"11.5rem"}
          onMouseEnter={() => handleMouseEnter("qcstatus")}
          onMouseLeave={() => handleMouseLeave("qcstatus")}
        >
          <ul>
            <li>
              <LinkNav to={"/requestqc"}>Request QC</LinkNav>
            </li>
            <li>
              <LinkNav to={"/passedqc"}>Passed QC</LinkNav>
            </li>
            <li>
              <LinkNav to={"/failedqc"}>Failed QC</LinkNav>
            </li>
          </ul>
        </DropdownMenu>
      )}
      {showDropdown.banner && (
        <DropdownMenu
          ml={"-5rem"}
          onMouseEnter={() => handleMouseEnter("banner")}
          onMouseLeave={() => handleMouseLeave("banner")}
        >
          <ul>
            <li>
              <LinkNav to={"/create-banner"}>Create Banner</LinkNav>
            </li>
            <li>
              <LinkNav to={"/showBanner"}>Show Banner</LinkNav>
            </li>
          </ul>
        </DropdownMenu>
      )}
      {showDropdown.category && (
        <DropdownMenu
          mr={"-17rem"}
          onMouseEnter={() => handleMouseEnter("category")}
          onMouseLeave={() => handleMouseLeave("category")}
        >
          <ul>
            <li>
              <LinkNav to={"/create-Category"}>Create Category</LinkNav>
            </li>
            <li>
              <LinkNav to={"/showCategory"}>Show Category</LinkNav>
            </li>
          </ul>
        </DropdownMenu>
      )}
      {showDropdown.order && (
        <DropdownMenu
          onMouseEnter={() => handleMouseEnter("order")}
          onMouseLeave={() => handleMouseLeave("order")}
          right={70}
        >
          <ul>
            <li>
              <LinkNav to={"/activeOrder"}>Active Order</LinkNav>
            </li>
            <li>
              <LinkNav to={"/delivered"}>Delivered</LinkNav>
            </li>
            <li>
              <LinkNav to={"/cancelled"}>Cancelled</LinkNav>
            </li>
            <li>
              <LinkNav to={"/refund"}>Refund</LinkNav>
            </li>
          </ul>
        </DropdownMenu>
      )}
    </>
  );
};

export default AdminNavbar;
