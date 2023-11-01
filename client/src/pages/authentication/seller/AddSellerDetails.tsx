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
import "../styles.css";

import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { addSellerDetails } from "../../../redux/features/sellerSlice";

export interface AddSellerInfoPayload {
  shopName: string;
  description: string;
  city: string;
  pincode: number | null;
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
  pincode: null,
  state: "",
  country: "",
};

const AddSellerInfo: React.FC = () => {
  const { auth } = useAuth();
  // console.log(auth)
  const token = auth?.token;
  // console.log(token)
  const dispatch = useAppDispatch();

  const [seller, setSeller] =
    useState<AddSellerInfoPayload>(initializeSellerData);

  const [pickupAddress, setPickupAddress] = useState<Pickup>({
    address: "",
    street: "",
    nearBy: "",
  });
  const handleShopNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, shopName: event.target.value }));
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSeller((prevUser) => ({ ...prevUser, description: event.target.value }));
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, city: event.target.value }));
  };
  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value to a number or keep it as null if it's empty
    const newPincode =
      event.target.value !== "" ? parseInt(event.target.value) : null;

    setSeller((prevUser) => ({ ...prevUser, pincode: newPincode }));
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, state: event.target.value }));
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, country: event.target.value }));
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickupAddress((prevUser) => ({
      ...prevUser,
      address: event.target.value,
    }));
  };
  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickupAddress((prevUser) => ({
      ...prevUser,
      street: event.target.value,
    }));
  };
  const handleNearByAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPickupAddress((prevUser) => ({
      ...prevUser,
      nearBy: event.target.value,
    }));
  };
  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const sellerId = auth?.user?._id;
    const formData = new FormData();

    formData.set("shopName", seller.shopName);
    formData.set("description", seller.description);
    formData.set("address", pickupAddress.address);
    formData.set("street", pickupAddress.street);
    formData.set("nearBy", pickupAddress.nearBy);
    formData.set("city", seller.city);
    formData.set(
      "pincode",
      seller.pincode !== null ? seller.pincode.toString() : ""
    );
    formData.set("state", seller.state);
    formData.set("country", seller.country);
    if (sellerId) {
      dispatch(addSellerDetails({ formData, sellerId }));
    }
  };

  return (
    <Box textAlign={"center"}>
      <Box
        sx={{
          marginTop: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Avatar
          sx={{
            m: 3,
            bgcolor: "secondary.main",
            width: "7rem",
            height: "7rem",
          }}
        >
          <LockOutlinedIcon style={{ fontSize: "3rem" }} />
        </Avatar>

        <form style={{ marginTop: 3 }} onSubmit={submitData}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                value={seller.shopName}
                label="Shop Name"
                onChange={handleShopNameChange}
                id="shopName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                value={seller.description}
                label="Description"
                onChange={handleDescriptionChange}
                id="description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="Address"
                value={pickupAddress.address}
                onChange={handleAddressChange}
                id="address"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="Street"
                value={pickupAddress.street}
                onChange={handleStreetChange}
                id="street"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="NearBy"
                value={pickupAddress.nearBy}
                onChange={handleNearByAddressChange}
                id="nearBy"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="City"
                value={seller.city}
                onChange={handleCityChange}
                id="city"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="Pincode"
                value={seller.pincode}
                onChange={handlePincodeChange}
                id="pincode"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="State"
                value={seller.state}
                onChange={handleStateChange}
                id="state"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                value={seller.country}
                label="Country"
                onChange={handleCountryChange}
                id="country"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              height: "4rem",
              fontSize: "2rem",
            }}
          >
            Add Seller Info
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddSellerInfo;
