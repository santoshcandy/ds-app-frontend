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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import UploadClientDocuments from "./UploadClientDocuments";
import BottomNav from "./BottomNav";
import { API_URL } from "../Config";


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
      .get(`${API_URL}/clients/${id}/`, {
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
      .patch(`${API_URL}/clients/${id}/update/`, client, {
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
      .post(`${API_URL}/clients/${id}/request-approval/`, {}, {
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
          Client  - {client.name}
        </Typography>

        <Grid container spacing={2}>
          {Object.keys(client).map((key) =>
            key !== "id" && key !== "created_at" && key !== "assigned_employee" ? (
              <Grid item xs={12} sm={6} key={key}>
                {key === "married_status" ? (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Married Status</InputLabel>
                    <Select
                      name="married_status"
                      value={client.married_status || ""}
                      onChange={handleChange}
                      label="Married Status"
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="married">Married</MenuItem>
                    </Select>
                  </FormControl>
                ) : key === "approval_status" ? (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Approval Status</InputLabel>
                    <Select
                      name="approval_status"
                      value={client.approval_status || ""}
                      onChange={handleChange}
                      label="Approval Status"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="proceed">Proceed</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    name={key}
                    label={key.replace("_", " ").toUpperCase()}
                    value={client[key] || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                )}
              </Grid>
            ) : null
          )}
        </Grid>

        <UploadClientDocuments clientId={id} />

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
      <BottomNav />
    </>
  );
};

export default ClientDetails;
