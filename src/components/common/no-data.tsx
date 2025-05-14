// components/common/NoData.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface NoDataProps {
  message?: string;
  height?: string | number;
}

const NoData: React.FC<NoDataProps> = ({
  message = "No data available",
  height = "300px",
}) => {
  return (
    <Box
      height={height}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      color="text.secondary"
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 50, mb: 1 }} />
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default NoData;
