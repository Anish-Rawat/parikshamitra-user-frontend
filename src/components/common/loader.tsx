// components/common/Loader.tsx
"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
  size?: number;
}

const Loader = ({ message = "Loading...", size = 40 }: LoaderProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="300px"
      width="100%"
    >
      <CircularProgress size={size} color="primary" />
      <Typography variant="body2" color="text.secondary" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
