import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { Box, Button, Input } from "@mui/material";
import { createBanner } from "../../../redux/features/bannerSlice";

const CreateBanner: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (image) {
      formData.append("image", image); // Don't convert to Base64 here
    } else {
      alert("please select a photo");
    }

    dispatch(createBanner(formData));
    setImage(null);
  };
 
  return (
    <Box m={"12rem"}>
      <form onSubmit={handleSubmit}>
        <Box maxWidth="30%">
          <Input
            type="file"
            name="image"
            inputProps={{ accept: "image/*" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.files![0])
            }
            style={{ fontSize: "2rem" }}
          
          />
        </Box>
        <Button
          sx={{ width: "10rem" }}
          variant="outlined"
          color="primary"
          type="submit"
        >
          Create banner
        </Button>
      </form>
    </Box>
  );
};

export default CreateBanner;
