import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import productIcon from "../../assets/add-product.png";
import orderIcon from "../../assets/shopping-bag.png";
import qcIcon from "../../assets/quality-control_10655670.png";
import MailIcon from "@mui/icons-material/Mail";
import Person2Icon from "@mui/icons-material/Person2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/context/useAuth";

const drawerWidth = 600;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SellerDashboard(props: Props) {
  const { window } = props;
  const { auth, setAuth } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <Stack direction={"column"} gap={"3rem"} mt={"4rem"}>
        {/* Dashboard */}
        <ListItem disablePadding>
          <Link to={"/seller-dashboard"}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon style={{ fontSize: "6rem" }} />
              </ListItemIcon>
              <Typography fontSize={"4rem"}>Dashboard</Typography>
            </ListItemButton>
          </Link>
        </ListItem>

        {/* Add Listing (Add Product) */}
        <Link to={"/add-products"}>
          <ListItem disablePadding>
            <ListItemButton>
              <Box>
                <img
                  style={{ width: "7rem" }}
                  src={productIcon}
                  alt="product icon"
                />
              </Box>
              <Typography style={{ fontSize: "3rem", fontWeight: 700 }}>
                {" "}
                Add Product
              </Typography>
            </ListItemButton>
          </ListItem>
        </Link>

        {/* QC Status */}
        <Link to={"/qc-product"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img style={{ width: "7rem" }} src={qcIcon} alt="qc icon" />
              </ListItemIcon>
              <Typography style={{ fontSize: "3rem", fontWeight: 700 }}>
                QC Status
              </Typography>
            </ListItemButton>
          </ListItem>
        </Link>

        {/* Orders */}
        <Link to={"/active-seller-orders"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img
                  style={{ width: "7rem" }}
                  src={orderIcon}
                  alt="order icon"
                />
              </ListItemIcon>
              <Typography style={{ fontSize: "3rem", fontWeight: 700 }}>
                Orders
              </Typography>
            </ListItemButton>
          </ListItem>
        </Link>

        {/* Profile */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Person2Icon style={{ fontSize: "6rem" }} />
            </ListItemIcon>
            <Typography style={{ fontSize: "3rem", fontWeight: 700 }}>
              Profile
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon style={{ fontSize: "6rem" }} />
            </ListItemIcon>
            <Typography style={{ fontSize: "3rem", fontWeight: 700 }}>
              Logout
            </Typography>
          </ListItemButton>
        </ListItem>
      </Stack>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "7rem",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            mt={"1.1rem"}
            variant="h6"
            fontSize={"3rem"}
            noWrap
            component="div"
          >
            The FashionCart
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>Your main content here...</Typography>
      </Box>
    </Box>
  );
}
