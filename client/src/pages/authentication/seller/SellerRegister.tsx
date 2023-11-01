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
import "../styles.css";

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

const SellerRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const [seller, setSeller] =
    useState<RegisterSellerPayload>(initializeSellerData);
  // const [name,setName] = useState<string>("")
  // const [email,setEmail] = useState<string>("")
  // const [password,setPassword] = useState<string>("")
  const [avatar, setAvatar] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAvatar = event.target.files![0];
    setAvatar(selectedAvatar);

    const previewUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(previewUrl);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, name: event.target.value }));
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, email: event.target.value }));
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevUser) => ({ ...prevUser, password: event.target.value }));
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSeller((prevUser) => ({
      ...prevUser,
      confirmPassword: event.target.value,
    }));
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!name || !email || !password) {
    //   // Handle validation error, for example, display an error message
    //   console.log("Please enter all required fields.");
    //   return;
    // }
    const formData = new FormData();
    formData.set("name", seller.name);
    formData.set("email", seller.email);
    formData.set("password", seller.password);
    formData.set("avatar", avatar || "");
    dispatch(registerSeller(formData));
  };

  return (
    <Box textAlign={"center"}>
      {/* <RegisterStepper activeStep={0} /> */}
      <Box
        sx={{
          marginTop: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "5rem",
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
                value={seller.name}
                id="name"
                label="Name"
                autoComplete="name"
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                value={seller.email}
                required
                id="email"
                onChange={handleEmailChange}
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                value={seller.password}
                label="Password"
                onChange={handlePasswordChange}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                value={seller.confirmPassword}
                label="Confirm Password"
                type="password"
                onChange={handleConfirmPasswordChange}
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                type="file"
                // value={avatar}
                name="avatar"
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
            sx={{
              mt: 3,
              mb: 2,
              width: "24rem",
              height: "4rem",
              fontSize: "2rem",
            }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login-seller">
              <Typography
                sx={{ fontSize: "2rem", ":hover": { color: "black" } }}
              >
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SellerRegister;
