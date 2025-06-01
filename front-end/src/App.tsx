import { Box, Typography } from "@mui/material";

export default function App() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" sx={{ color: "blue", fontWeight: "bold" }}>
        Teste de Front-end.
      </Typography>
    </Box>
  );
}
