import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../redux/hooks";
import { Seller, loginSeller } from "../../../redux/features/sellerSlice";
import {AuthProps, useAuth } from "../../context/useAuth";
import { User } from "../../../redux/features/userSlice";
import "../styles.css";


type FormData = {
  email: string;
  password: string;
};

const UserLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const {auth,setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
 
  const schema: ZodType<FormData> = z.object({
    
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });
  console.log(auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    try {
      const res = await dispatch(loginSeller(data));

      if (loginSeller.fulfilled.match(res)) {
        const user = res.payload;
        setAuth({
          user: user,
          token: user.token, // Assuming your response includes a 'token' field
        });
        localStorage.setItem("auth", JSON.stringify(user));
        navigate(location.state || "/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth)
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form noValidate onSubmit={handleSubmit(submitData)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
               className="textFieldCommonStyles"
                required
              
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
               className="textFieldCommonStyles"
                required
                
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login-seller">New ? Sign up</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default UserLogin;
