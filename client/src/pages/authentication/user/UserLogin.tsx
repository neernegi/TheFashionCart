import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { loginUser, userSelector } from "../../../redux/features/userSlice";
import { useAuth } from "../../context/useAuth";
import "../styles.css";

type FormData = {
  email: string;
  password: string;
};

const UserLogin: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userSelector);

  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    try {
      const res = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(res)) {
        const user = res.payload;
        setAuth({
          user: user,
          token: user.token, // Assuming your response includes a 'token' field
        });
        localStorage.setItem("auth", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box textAlign={"center"} mb={"14vmax"}>
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
          Log in
        </Typography>
        <form onSubmit={handleSubmit(submitData)}>
          <Stack spacing={4}>
            <Box>
              <TextField
                className="textFieldCommonStyles"
                required
                style={{ width: "30rem" }}
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </Box>
            <Box>
              <TextField
                className="textFieldCommonStyles"
                required
                style={{ width: "30rem" }}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </Box>
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 5,
              mb: 2,
              width: "22rem",
              height: "4rem",
              fontSize: "2rem",
            }}
          >
            Log in
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserLogin;
