import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createCategory, categorySelector } from "../../../redux/features/categorySlice";
import { Box, Button, Input, Stack, TextField, Typography } from "@mui/material";

const CreateCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(categorySelector);

  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    if (avatar) {
      formData.append("avatar", avatar); // Don't convert to Base64 here
    }

    dispatch(createCategory(formData));
  };
  return (
    <Box textAlign="center">
      <Typography mt="2rem" variant="h2" component="h3" color="black">
        Create a Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack m="4rem" direction="column" gap="2rem">
          <Box maxWidth="25%">
            <TextField
              hiddenLabel
              id="category"
              variant="filled"
              label="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "2rem", fontWeight: "bolder" },
              }}
              inputProps={{
                style: {
                  height: "4.5rem",
                  fontSize: "3rem",
                  marginTop: "1.2rem",
                },
              }}
            />
          </Box>
          <Box maxWidth="30%" display="flex">
            <Input
              type="file"
              name="avatar"
              inputProps={{ accept: "image/*" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAvatar(e.target.files![0])}
              style={{ fontSize: "2rem" }}
            />
          </Box>
          <Button
            sx={{ width: "10rem" }}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Create Category
          </Button>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Stack>
      </form>
    </Box>
  );
};

export default CreateCategory;
