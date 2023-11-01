import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Input,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { registerUser } from "../../../redux/features/userSlice";
import "../styles.css";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const UserRegister: React.FC = () => {
  const [user, setUser] = useState<FormDataProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

  const dispatch = useAppDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, name: event.target.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, email: event.target.value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, password: event.target.value }));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      confirmPassword: event.target.value,
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAvatar = event.target.files![0];
    setAvatar(selectedAvatar);

    // Create a preview URL for the selected avatar
    const previewUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(previewUrl);
  };

  const submitData = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", avatar || "");
    dispatch(registerUser(formData));
  };

  // const theme = createTheme({
  //   components: {
  //     MuiTextField: {
  //       styleOverrides: {
  //         root: {
  //           // Common styles for all TextField components
  //           fontSize: "1.8rem",
  //         },
  //         input: {
  //           // Common input styles for all TextField components
  //           fontSize: "2rem",
  //           height: "5rem",
  //           padding: "1rem",
  //         },
  //       },
  //     },
  //   },
  // });

  return (
    <Box textAlign={"center"}>
      <Box
        sx={{
          marginTop: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "secondary.main",
            width: "7rem",
            height: "7rem",
          }}
        >
          <LockOutlinedIcon style={{ fontSize: "3rem" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form style={{ marginTop: 3 }} onSubmit={submitData}>
          <Stack spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                autoComplete="name"
                value={user.name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                value={user.email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={user.password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="textFieldCommonStyles"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password" // Change this to "current-password" or "off"
                value={user.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                name="avatar"
                id="avatar"
                inputProps={{ accept: "image/*" }}
                onChange={handleAvatarChange}
                style={{ fontSize: "2rem", width: "30rem" }}
              />
              {avatarPreview && <Avatar alt={user.name} src={avatarPreview} />}
            </Grid>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              width: "22rem",
              height: "4rem",
              fontSize: "2rem",
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserRegister;
