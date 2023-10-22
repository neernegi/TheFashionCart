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

import axios from "axios";
import { useAuth } from "../../context/useAuth";

export interface AddSellerInfoPayload {
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

const initializeSellerData: AddSellerInfoPayload = {
  shopName: "",
  description: "",
  city: "",
  pincode: 0,
  state: "",
  country: "",
};

const AddSellerInfo: React.FC = () => {
  const {auth} = useAuth();
  // console.log(auth)
  const token = auth?.token
  // console.log(token)

  const [seller, setSeller] =
    useState<AddSellerInfoPayload>(initializeSellerData);

  const [pickupAddress, setPickupAddress] = useState<Pickup>({
    address: "",
    street: "",
    nearBy: "",
  });

  const handleInputChange = (field: keyof AddSellerInfoPayload, value: any) => {
    setSeller((prevSeller) => ({
      ...prevSeller,
      [field]: value,
    }));
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("shopName", seller.shopName);
    formData.set("description", seller.description);
    formData.set("address", pickupAddress.address);
    formData.set("street", pickupAddress.street);
    formData.set("nearBy", pickupAddress.nearBy);
    formData.set("city", seller.city);
    formData.set("pincode", seller.pincode.toString());
    formData.set("state", seller.state);
    formData.set("country", seller.country);

    try {
      // Make the POST request to your API
      const response = await axios.post(
        `http://localhost:8080/api/v1/seller/seller-details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log("Response:", response.data);

      // Dispatch the addSellerInfo action with the response data if required

      // Redirect or perform other actions as needed
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error:", error);
    }
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
                onChange={(e) =>
                  setPickupAddress((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setPickupAddress((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setPickupAddress((prev) => ({
                    ...prev,
                    nearBy: e.target.value,
                  }))
                }
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Seller Info
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

export default AddSellerInfo;
