import { AppBar, Box, Toolbar, styled } from "@mui/material";
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

const StyledHeader = styled(AppBar)({
  height: "7rem",
  width: "100%",
  display: "flex",
  flexDirection: "row",
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

 

  return (
    <StyledHeader color="inherit" position="sticky">
      <Toolbar>
        <NavBox>
          {auth.user?.role === "seller" ? (
            <>
              <SellerNavbar />
            </>
          ) : (
            <>
              <LinkNav to={"/"}>E-store</LinkNav>
              {auth?.user?.role === "admin" ? (
                <>
                  <AdminNavbar />
                </>
              ) : (
                <>
                  <Box>
                    <Search />
                  </Box>

                  <LinkNav to={"/cart-products"}>
                    <ShoppingBagIcon style={{ fontSize: "3rem" }} />
                  </LinkNav>
                  {items.length > 0 && (
                    <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {items.length}
                    </span>
                  )}

                  <LinkNav to={"/seller-register"}>Become a Seller</LinkNav>
                  {auth?.user?.role === "user" ? (
                    <>
                      <LinkNav to={""}>
                        <ChatIcon style={{ fontSize: "3rem" }} />
                      </LinkNav>
                      <LinkNav to={""}>
                        <CircleNotificationsIcon style={{ fontSize: "3rem" }} />
                      </LinkNav>
                      <LinkNav
                        to={
                          auth?.user?.role === "user"
                            ? "/my-profile"
                            : "/user-login"
                        }
                        onMouseEnter={handleLoginLinkHover}
                        onMouseLeave={handleLoginLinkLeave}
                      >
                        Profile
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
            left: linkOptionsPosition.left,
            top: linkOptionsPosition.top,
            position: "absolute",
            borderRadius: "1rem",
            backgroundColor: "#443f40a2",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            padding: "10px",
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
  );
};

export default Header;
