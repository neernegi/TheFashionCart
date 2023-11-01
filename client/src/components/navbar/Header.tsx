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
  gap: "8rem",
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
  return (
    <Box>
      <StyledHeader color="inherit" position="sticky">
        <Toolbar>
          <NavBox>
            {auth.user?.role === "seller" ? (
              <>
                {/* <SellerNavbar /> */}
                <SellerDashboard />
              </>
            ) : (
              <>
                <LinkNav to={"/"}>The Fashion Cart</LinkNav>
                {auth?.user?.role === "admin" ? (
                  <>
                    <AdminNavbar />
                  </>
                ) : (
                  <>
                    {/* <LinkNav to={"/cart-products"}>
                      <ShoppingBagIcon style={{ fontSize: "3rem" }} />
                    </LinkNav>
                    {items.length > 0 && (
                      <span style={{ color: "black" }}>{items.length}</span>
                    )} */}

                    <LinkNav to={"/register-seller-stepper"}>
                      Become a Seller
                    </LinkNav>
                    {auth?.user?.role === "user" ? (
                      <>
                        <LinkNav
                          to={
                            auth?.user?.role === "user"
                              ? "/my-profile"
                              : "/user-login"
                          }
                          onMouseEnter={handleLoginLinkHover}
                          onMouseLeave={handleLoginLinkLeave}
                        >
                          {auth?.user?.name}
                        </LinkNav>
                      </>
                    ) : (
                      <>
                        <LinkNav
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
                            color: "black",
                            marginLeft:6,
                            fontSize: "2.4rem",
                            fontWeight: 600,
                          }}
                        >
                          {items.length}
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
