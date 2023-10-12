import React, { Fragment, useState, useEffect } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

export interface ShippingInfoProps {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number | undefined;
  phoneNo: string;
}

const Shipping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ShowShippingForm, setShowShippingForm] = useState<boolean>(false);

  const { auth } = useAuth();

  const initialShippingState: ShippingInfoProps = {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: undefined,
    phoneNo: "",
  };
  const [shipping, setShipping] =
    useState<ShippingInfoProps>(initialShippingState);

  // Load saved shipping data from local storage or initialize as an empty array
  const savedShippingData = localStorage.getItem("savedShipping");
  const [savedShipping, setSavedShipping] = useState<ShippingInfoProps[]>(
    savedShippingData ? JSON.parse(savedShippingData) : []
  );
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    // Load saved shipping info from local storage
    const savedShippingData = localStorage.getItem("savedShipping");
    if (savedShippingData) {
      setSavedShipping(JSON.parse(savedShippingData));
    }
  }, []);
  const [selectedAddress, setSelectedAddress] = useState<ShippingInfoProps | null>(
    null
  );

  const [numShippingInfo, setNumShippingInfo] = useState(1);

  const shippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (shipping.phoneNo.length !== 10) {
      alert("Phone Number should be 10 digits long");
      return;
    }

    if (numShippingInfo < 4) {
      setNumShippingInfo(numShippingInfo + 1);

      // Update the savedShipping array with the new shipping information
      const updatedSavedShipping = [...savedShipping, shipping];
      setSavedShipping(updatedSavedShipping);

      // Save the updated shipping info to local storage
      localStorage.setItem(
        "savedShipping",
        JSON.stringify(updatedSavedShipping)
      );

      setShipping(initialShippingState);
      setSelectedAddressIndex(updatedSavedShipping.length - 1);
    } else {
      setNumShippingInfo(4);
    }
    setShowShippingForm(false);
  };

  useEffect(() => {
    // Load the selected address from local storage when the component mounts
    const savedSelectedAddress = localStorage.getItem("selectedAddress");
    if (savedSelectedAddress !== null) {
      setShipping(JSON.parse(savedSelectedAddress));
    }
  }, []);

  const handleRadioChange = (index: number) => {
    const selectedAddress = savedShipping[index];
    setShipping(selectedAddress);

    // Save the selected address in local storage
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  }

  const renderShippingInfoForms = () => {
    return (
      <RadioGroup value={savedShipping.indexOf(shipping).toString()} onChange={(e) => handleRadioChange(Number(e.target.value))}>
        {savedShipping.map((entry, index) => (
          <FormControlLabel
            key={index}
            value={index.toString()} // Use the index as the value
            control={<Radio />}
            label={
              <Box marginLeft={"20rem"} marginTop={"5rem"}>
                <Typography fontSize={"2rem"} color={"black"}>
                  {entry.address}
                </Typography>
                <Typography fontSize={"2rem"} color={"black"}>
                  {entry.city}
                </Typography>
                <Typography fontSize={"2rem"} color={"black"}>
                  {entry.country}
                </Typography>
                <Typography fontSize={"2rem"} color={"black"}>
                  {entry.pinCode}
                </Typography>
                <Typography fontSize={"2rem"} color={"black"}>
                  {entry.phoneNo}
                </Typography>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    );
  };
  return (
    <Fragment>
      <Box margin={"5rem"}>{renderShippingInfoForms()}</Box>
      {ShowShippingForm ? (
        <>
          <Box display={"flex"} justifyContent={"center"} mt={"20rem"}>
            <Box className="shippingBox">
              <h2 className="shippingHeading">Shipping Details</h2>

              <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
                  {/* Render input fields for the current shipping info */}
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    <TextField
                      type="text"
                      id="home-address"
                      label="Address"
                      variant="standard"
                      value={shipping.address}
                      onChange={(e) =>
                        setShipping({ ...shipping, address: e.target.value })
                      }
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LocationCityIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      type="text"
                      placeholder="City"
                      label="City"
                      required
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PinDropIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      type="text" // Use type "number" for pinCode
                      placeholder="Pin Code"
                      label={"Pin Code"}
                      required
                      value={shipping.pinCode || ""}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          pinCode: Number(e.target.value),
                        })
                      }
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PhoneIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      type="text"
                      placeholder="Phone Number"
                      required
                      label={"Phone Number"}
                      value={shipping.phoneNo}
                      onChange={(e) =>
                        setShipping({ ...shipping, phoneNo: e.target.value })
                      }
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PublicIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      type="text"
                      placeholder="country"
                      required
                      label={"Country"}
                      value={shipping.country}
                      onChange={(e) =>
                        setShipping({ ...shipping, country: e.target.value })
                      }
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <TransferWithinAStationIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      type="text"
                      placeholder="country"
                      required
                      label={"State"}
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({ ...shipping, state: e.target.value })
                      }
                    />
                  </Box>
                </Box>

                {numShippingInfo < 4 && (
                  <Button
                    style={{ margin: "2rem" }}
                    variant="contained"
                    type="submit"
                    value="Continue"
                    className="shippingBtn"
                    disabled={!shipping.state}
                  >
                    Deliver Here
                  </Button>
                )}
                <Button
                  style={{ margin: "2rem" }}
                  variant="contained"
                  type="submit"
                  value="Continue"
                  className="shippingBtn"
                  onClick={() => setShowShippingForm(false)}
                >
                  Cancel
                </Button>
              </form>
            </Box>
          </Box>
        </>
      ) : (
        <>
          {numShippingInfo < 4 && (
            <Button
              type="submit"
              value="Continue"
              onClick={() => setShowShippingForm(true)}
              className="shippingBtn"
            >
              Add Shipping Info
            </Button>
          )}
        </>
      )}
    </Fragment>
  );
};

export default Shipping;
