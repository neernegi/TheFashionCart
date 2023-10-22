import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { AuthProps } from "../../pages/context/useAuth";

export interface User {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

export interface UserState {
  user: User | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  isAuthenticated: boolean,
  error: String | null;
}

const initialState: UserState = {
  user: null,
  loading: "idle",
  isAuthenticated: false,
  error: null,
};

// interface RegisterUserPayload {
//   name: string;
//   email: string;
//   password: string;
// }

type LoginUserPayload = {
  email: string;
  password: string;
};

type UpdateProfilePayload = {
  name: String;
  email: String;
};

export const registerUser = createAsyncThunk(
  "user/register-user",
  async (formData:FormData) => {
    const response = await axios.post("http://localhost:8080/api/v1/user/register",formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.user;
  }
);
export const loginUser = createAsyncThunk<User, LoginUserPayload>(
  "user/login-user",
  async (data) => {
    const response = await axios.post("http://localhost:8080/api/v1/user/login",data);
    return response.data; // Assuming your response includes the 'user' and 'token' fields
  }
);

export const updateUserPassword = createAsyncThunk<User, { password: string }>(
  "/user-update-password",
  async () => {
    const response = await axios.put("/api/v1/user/password/update");
    return response.data.user;
  }
);
export const updateUserProfile = createAsyncThunk<User, UpdateProfilePayload>(
  "/update-user-profile",
  async () => {
    const response = await axios.put("/api/v1/user/user-update/profile");
    return response.data.user;
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
