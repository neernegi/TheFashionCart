import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import SellerRegister from "./SellerRegister";
import AddSellerDetails from "./AddSellerDetails";

interface RegisterStepperProps {
  activeStep: number; // Declare activeStep prop
}

const steps = [
  {
    label: <SellerRegister  />
  },
  {
    label: <AddSellerDetails />
  }
];

const RegisterStepper: React.FC<RegisterStepperProps> = ({ activeStep }) => {
  const [activeStepState, setActiveStep] = useState(activeStep);

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
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStepState} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index} active={activeStepState === index} completed={activeStepState > index}>
            <StepLabel>
              {step.label}
            </StepLabel>
           
          </Step>
        ))}
      </Stepper>
     
    </Box>
  );
};

export default RegisterStepper;
