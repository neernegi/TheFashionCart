import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Input,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { registerSeller } from "../../../redux/features/sellerSlice";

export interface RegisterSellerPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  shopName: string;
  description: string;

  city: string;
  pincode: number;
  state: string;
  country: string;
}
interface Pickup {
  address: string;
  street: string;
  nearBy: string;
}

const initializeSellerData: RegisterSellerPayload = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  shopName: "",
  description: "",

  city: "",
  pincode: 0,
  state: "",
  country: "",
};

const SellerRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const [seller, setSeller] =
    useState<RegisterSellerPayload>(initializeSellerData);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
  const [pickupAddress, setPickupAddress] = useState<Pickup>({
    address: "",
    street: "",
    nearBy: "",
  });
  const handleInputChange = (field: keyof RegisterSellerPayload, value: any) => {
    setSeller((prevSeller) => ({
      ...prevSeller,
      [field]: value,
    }));
  };
  
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAvatar = event.target.files![0];
    setAvatar(selectedAvatar);

    const previewUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(previewUrl);
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", seller.name);
    formData.set("email", seller.email);
    formData.set("password", seller.password);
    formData.set("shopName", seller.shopName);
    formData.set("description", seller.description);
    formData.set("address", pickupAddress.address);
    formData.set("street", pickupAddress.street);
    formData.set("nearBy", pickupAddress.nearBy);
    formData.set("city", seller.city);
    formData.set("pincode", seller.pincode.toString());
    formData.set("state", seller.state);
    formData.set("country", seller.country);
    formData.set("avatar", avatar || "");

    dispatch(registerSeller(formData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "5rem",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form style={{ marginTop: 3 }} onSubmit={submitData}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                onChange={(e) => handleInputChange("name", e.target.value)}
                label="Name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                onChange={(e) => handleInputChange("password", e.target.value)}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Shop Name"
                onChange={(e) => handleInputChange("shopName", e.target.value)}
                id="shopName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                id="description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                value={pickupAddress.address}
                onChange={(e) => setPickupAddress((prev) => ({ ...prev, address: e.target.value }))}
                id="address"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Street"
                value={pickupAddress.street}
                onChange={(e) => setPickupAddress((prev) => ({ ...prev, street: e.target.value }))}
                id="street"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="NearBy"
                value={pickupAddress.nearBy}
                onChange={(e) => setPickupAddress((prev) => ({ ...prev, nearBy: e.target.value }))}
                id="nearBy"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="City"
                onChange={(e) => handleInputChange("city", e.target.value)}
                id="city"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Pincode"
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                id="pincode"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="State"
                onChange={(e) => handleInputChange("state", e.target.value)}
                id="state"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Country"
                onChange={(e) => handleInputChange("country", e.target.value)}
                id="country"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                id="avatar"
                inputProps={{ accept: "image/*" }}
                onChange={handleAvatarChange}
                style={{ fontSize: "2rem" }}
              />
              {avatarPreview && (
                <Avatar alt={seller.name} src={avatarPreview} />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login-seller">Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SellerRegister;
