// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import { Button, Input, Stack } from "@mui/material";
// import { CloudUpload } from "@mui/icons-material";

// const steps = [
//   "Enter category details",
//   "Enter sub-category details",
//   "Preview",
// ];

// export const CreateCategory: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryImage, setCategoryImage] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
 


//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files && event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedImage) {
//       // Here, you can perform the actual upload logic
//       console.log("Uploading image:", selectedImage);
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCategoryName("");
//     setCategoryImage("");
//     setSubCategoryName("");
//   };

// ;

//   return (
//     <Box>
//       <Typography
//         mt={"6rem"}
//         textAlign={"center"}
//         variant="h2"
//         component="h2"
//         color={"black"}
//       >
//         Create Category and Sub-Category
//       </Typography>
//       <Box sx={{ width: "60%", m: "7rem auto" }}>
//         <Stepper activeStep={activeStep}>
//           {steps.map((label, index) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         {activeStep === steps.length ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1, fontSize: "2rem" }}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Box sx={{ flex: "1 1 auto" }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             {activeStep === 0 && (
              
//             )}
//             {activeStep === 1 && (
//               <Box mt={"4rem"} alignItems={"center"}>
//                 <Typography
//                   mt={"2rem"}
//                   variant="h3"
//                   component="h3"
//                   color={"black"}
//                   textAlign={"center"}
//                 >
//                   Create Sub-Category
//                 </Typography>
//                 <Stack direction={"column"} maxWidth={"25%"} gap={"2rem"}>
//                   <Typography sx={{ mt: 2, mb: 1 }}>
//                     Step {activeStep + 1}
//                   </Typography>
//                  </Stack>
//               </Box>
//             )}
//             {activeStep === 2 && (
//               <Box color={"black"}>
//                 <Typography sx={{ mt: 2, mb: 1 }}>
//                   Step {activeStep + 1}
//                 </Typography>
//                 <Typography variant="h5">Preview:</Typography>
//                 <Typography
//                   mt={"2rem"}
//                   variant="h3"
//                   component="h3"
//                   color={"black"}
//                   textAlign={"center"}
//                 >
//                   Category Name: {categoryName}
//                 </Typography>
//                 <Typography
//                   mt={"2rem"}
//                   variant="h3"
//                   component="h3"
//                   color={"black"}
//                   textAlign={"center"}
//                 >
//                   Category Image: {/* Display image or image name */}
//                 </Typography>
//                 <Typography
//                   mt={"2rem"}
//                   variant="h3"
//                   component="h3"
//                   color={"black"}
//                   textAlign={"center"}
//                 >
//                   Sub-Categories:
//                 </Typography>
//                 <ul>
//                   {subCategories.map((subCategory, index) => (
//                     <li key={index}>{subCategory}</li>
//                   ))}
//                 </ul>
//               </Box>
//             )}
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: "1 1 auto" }} />
//               <Button onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? "Finish" : "Next"}
//               </Button>
//             </Box>
//           </React.Fragment>
//         )}
//       </Box>
//     </Box>
//   );
// };
