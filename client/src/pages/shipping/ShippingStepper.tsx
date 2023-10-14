import * as React from "react";
import {useState,useEffect} from "react"
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Shipping from "./Shipping";
import ConfirmOrder from "./ConfirmOrder";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


const steps = ["Shipping Info", "Confirm Order", "Payment"];

const getStepContent = (step: number) => {
  const [stripeApiKey, setStripeKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/payment/stripeapikey"
    );

    setStripeKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);
  switch (step) {
    case 0:
      return <Shipping />;
    case 1:
      return <ConfirmOrder />;
    case 2:
      return <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>;
    default:
      return "Unknown step";
  }
};

const OrderStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%",mt:"4rem" }} >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default OrderStepper;
