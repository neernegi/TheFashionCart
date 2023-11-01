import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SellerRegister from "./SellerRegister";
import AddSellerInfo from "./AddSellerDetails";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const steps = [
  {
    label: "Create Seller Account",
    stepper: <SellerRegister />,
  },
  {
    label: "Add Some Details",
    stepper: <AddSellerInfo />,
  },
];

export default function VerticalLinearStepper() {
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

  const customTheme = createTheme({
    components: {
      MuiStepLabel: {
        styleOverrides: {
          label: {
            fontSize: "2rem",
           
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ maxWidth: 600, ml: "40%",mt:"6%",mb:"5%" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconProps={{
                  style: {
                    fontSize: "3rem",
                  },
                }}
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent >
                {step.stepper}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                     disabled={index === 1}
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1,fontSize:"1.5rem" }}
                    >
                     Continue
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1,fontSize:"1.5rem" }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
      </Box>
    </ThemeProvider>
  );
}
