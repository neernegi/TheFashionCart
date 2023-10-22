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
// import RegisterStepper from "./RegisterStepper";




export interface RegisterSellerPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initializeSellerData: RegisterSellerPayload = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
// interface SellerRegisterProps {
//   handleNext: () => void; // Declare handleNext prop
// }

const SellerRegister:React.FC=()=> {
  const dispatch = useAppDispatch();
  const [seller, setSeller] =
    useState<RegisterSellerPayload>(initializeSellerData);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

  const handleInputChange = (
    field: keyof RegisterSellerPayload,
    value: any
  ) => {
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
    formData.set("avatar", avatar || "");
    dispatch(registerSeller(formData));
   
  };

  return (
    <Container component="main" maxWidth="xs">
     {/* <RegisterStepper activeStep={0} /> */}
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
