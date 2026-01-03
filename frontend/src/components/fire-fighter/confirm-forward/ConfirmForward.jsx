import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const API =
  "http://localhost/fire-fighter-new/backend/controllers";

export default function ConfirmForwardIncidence() {
  const { incidentId, stationName } = useParams();
  const navigate = useNavigate();

  const handleFinalConfirm = async () => {
    await fetch(`${API}/incidents/forward_incident.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        incidentId,
        stationName: decodeURIComponent(stationName),
      }),
    });

    alert("Incident forwarded successfully");
    navigate("/fire-fighter-dashboard");
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4, bgcolor: "#0F0F10", color: "white" }}>
      <Stack spacing={3} maxWidth={600} mx="auto">
        <Card>
          <CardHeader title="Confirm Incident Forwarding" />
          <CardContent>
            <Typography>
              Incident ID: <Chip label={incidentId} color="error" />
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Forward To:{" "}
              <Chip
                label={decodeURIComponent(stationName)}
                color="primary"
              />
            </Typography>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          size="large"
          startIcon={<CheckIcon />}
          onClick={handleFinalConfirm}
        >
          Confirm & Share Incident
        </Button>

        <Button
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Stack>
    </Box>
  );
}