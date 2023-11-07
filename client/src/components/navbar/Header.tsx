import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  makeStyles,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Search from "../Search";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ChatIcon from "@mui/icons-material/Chat";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AdminNavbar from "./AdminNavbar";
import { useAuth } from "../../pages/context/useAuth";
import SellerNavbar from "./SellerNavbar";
import { selectItems } from "../../redux/features/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import SellerDashboard from "./SellerDashboard";
import { GrCart } from "react-icons/gr";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledHeader = styled(AppBar)({
  height: "7rem",
  width: "50%",
  borderRadius: "4rem",
  display: "flex",
  flexDirection: "row",
  margin: "0 auto",
  justifyContent: "center",
});

const NavBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "3rem",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",
  alignSelf: "center",
  justifySelf: "center",
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

const Header: React.FC = () => {
  const items = useAppSelector(selectItems);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [linkOptionsPosition, setLinkOptionsPosition] = useState<{
    left: number;
    top: number;
  }>({
    left: 0,
    top: 0,
  });

  const handleLoginLinkHover = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const linkOptionsLeft = buttonRect.left;
    const linkOptionsTop = buttonRect.top + buttonRect.height;
    setLinkOptionsPosition({ left: linkOptionsLeft, top: linkOptionsTop });
    setShowDropdown(true);
  };

  const handleLoginLinkLeave = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      setShowDropdown(false);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("logout successfully");
  };
  // const gradientStyles = {
  //   background: `linear-gradient(to right, rgba(167, 143, 191, 1) 0%, rgba(178, 160, 203, 1))`,
  // };

  // bgcolor={'rgba(167, 143, 191, 1)'}

  const linkArrowIcon = showDropdown ? (
    <KeyboardArrowUpIcon
      style={{ fontSize: "3rem", marginBottom: -10, marginLeft: -17 }}
    />
  ) : (
    <KeyboardArrowDownIcon
      style={{ fontSize: "3rem", marginBottom: -10, marginLeft: -17 }}
    />
  );
  return (
    <Box>
      <StyledHeader color="inherit" position="sticky">
        <Toolbar>
          <NavBox>
            {auth.user?.role === "seller" ? (
              <>
                <SellerNavbar />
                {/* <SellerDashboard /> */}
              </>
            ) : (
              <>
                <LinkNav
                  style={{ marginRight: "22rem",marginLeft: "-8rem" }}
                  to={"/"}
                >
                  TheFashionCart
                </LinkNav>
                {auth?.user?.role === "admin" ? (
                  <>
                    <AdminNavbar />
                  </>
                ) : (
                  <>
                    <LinkNav to={"/register-seller-stepper"}>
                      Become a Seller
                    </LinkNav>
                    {auth?.user?.role === "user" ? (
                      <>
                        <LinkNav
                          style={{ marginLeft: "10rem" }}
                          to={
                            auth?.user?.role === "user"
                              ? "/my-profile"
                              : "/user-login"
                          }
                          onMouseEnter={handleLoginLinkHover}
                          onMouseLeave={handleLoginLinkLeave}
                        >
                          {auth?.user?.name} <span>{linkArrowIcon}</span>
                        </LinkNav>
                      </>
                    ) : (
                      <>
                        <LinkNav
                          style={{marginRight:"4rem" }}
                          to={
                            auth.user?.role === "user"
                              ? "/my-profile"
                              : "/user-login"
                          }
                          onMouseEnter={handleLoginLinkHover}
                          onMouseLeave={handleLoginLinkLeave}
                        >
                          Login
                        </LinkNav>
                      </>
                    )}
                    <LinkNav
                      to={"/cart-products"}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <GrCart style={{ fontSize: "3rem" }} />
                      {items.length > 0 && (
                        <span
                          style={{
                            color: "white",
                            marginLeft: -25,
                            marginTop: "-2.8rem",
                            borderRadius: "70%",
                            fontWeight: 600,
                            padding: "0 10px 0 10px",
                            backgroundColor: "rgba(25, 118, 210, 1)",
                          }}
                        >
                          <text style={{ fontSize: "1.8rem" }}>
                            {" "}
                            {items.length}
                          </text>
                        </span>
                      )}
                    </LinkNav>
                  </>
                )}
              </>
            )}
          </NavBox>
        </Toolbar>
        {showDropdown && (
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{
              // left
              right: "32rem",
              top: linkOptionsPosition.top,
              position: "absolute",
              borderRadius: "1rem",
              backgroundColor: "white",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
              padding: "1rem 2rem 2rem 2rem",
              minWidth: "200px",
            }}
          >
            <ul>
              {auth?.user?.role === "user" ? (
                <>
                  <li>
                    <LinkNav to="/my-profile">My Profile</LinkNav>
                  </li>
                  <li>
                    <LinkNav to="/my-orders">My Orders</LinkNav>
                  </li>
                  <li>
                    <LinkNav to="/wishlist">Wishlist</LinkNav>
                  </li>
                  <li>
                    <LinkNav to="/contact">Contact</LinkNav>
                  </li>
                  <li>
                    <LinkNav onClick={handleLogout} to={"/"}>
                      Logout
                    </LinkNav>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <LinkNav to="/user-register">Signup</LinkNav>
                  </li>
                  <li>
                    <LinkNav to="/my-orders">My Orders</LinkNav>
                  </li>
                  <li>
                    <LinkNav to="/wishlist">Wishlist</LinkNav>
                  </li>
                  <li>
                    <LinkNav to="/contact">Contact</LinkNav>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </StyledHeader>
    </Box>
  );
};

export default Header;
