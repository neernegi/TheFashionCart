import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box marginTop="7rem" position={"static"} padding="8rem 0" bgcolor={"grey"}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography variant="h3" fontWeight="bold" mb="30px">
            TheFashionCsart
          </Typography>
          <Box></Box>
        </Box>

        <Box>
          <Typography variant="h3" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography variant="h4" mb="30px">
            Careers
          </Typography>
          <Typography variant="h4" mb="30px">
            Our Stores
          </Typography>
          <Typography variant="h4" mb="30px">
            Terms & Conditions
          </Typography>
          <Typography variant="h4" mb="30px">
            Privacy Policy
          </Typography>
        </Box>

        <Box>
          <Typography variant="h3" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography variant="h4"  mb="30px">Help Center</Typography>
          <Typography variant="h4"  mb="30px">Track Your Order</Typography>
          <Typography variant="h4"  mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography variant="h4"  mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h3" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography variant="h4"  mb="30px">
            50 north Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography variant="h4"  mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: mredwardroh@gmail.com
          </Typography>
          <Typography variant="h4"  mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
