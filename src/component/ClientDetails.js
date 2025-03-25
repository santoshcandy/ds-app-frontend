import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Snackbar,
} from "@mui/material";
import UploadClientDocuments from "./UploadClientDocuments";
import BottomNav from "./BottomNav";

const ClientDetails = () => {
  const { id } = useParams(); // Get client ID from URL
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  // Fetch client details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/manage/clients/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setClient(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching client:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  // Update client details
  const handleUpdate = () => {
    axios
      .patch(`http://127.0.0.1:8000/manage/clients/${id}/update/`, client, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setMessage("Client updated successfully!");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setMessage("Error updating client.");
        setOpenSnackbar(true);
        console.error(error);
      });
  };

  // Request approval
  const handleApprovalRequest = () => {
    axios
      .post(`http://127.0.0.1:8000/manage/clients/${id}/request-approval/`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setMessage("Approval request sent successfully!");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setMessage("Error sending approval request.");
        setOpenSnackbar(true);
        console.error(error);
      });
  };

  if (loading) return <Typography>Loading client details...</Typography>;

  return (
    <>
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Client Details - {client.name}
      </Typography>

      <Grid container spacing={2}>
        {Object.keys(client).map((key) =>
          key !== "id" && key !== "created_at" && key !== "assigned_employee" ? (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                name={key}
                label={key.replace("_", " ").toUpperCase()}
                value={client[key] || ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          ) : null
        )}
      </Grid>
        <UploadClientDocuments clientId={id}/>
      <Box mt={3} mb={10}>
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mr: 2 }}>
          Update Client
        </Button>
        <Button variant="contained" color="secondary" onClick={handleApprovalRequest}>
          Request Approval
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Container>
  <BottomNav/>
    </>
  );
};

export default ClientDetails;
