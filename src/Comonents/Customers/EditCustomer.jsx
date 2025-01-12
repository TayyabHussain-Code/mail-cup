import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { editCustomer } from "../../DAL/AdminUser/EditCustomer";

const EditCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Id } = useParams(); // Get user_id from the URL
  const customerData = location.state; // Data passed from the table

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    industry_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate fields with the passed customer data
  useEffect(() => {
    if (customerData) {
      setFormData({
        first_name: customerData.first_name || "",
        last_name: customerData.last_name || "",
        email: customerData.user?.email || "",
        industry_type: customerData.industry_type || "",
      });
    }
  }, [customerData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update button click
  const handleUpdate = async () => {
    setError(""); // Clear previous errors
    setLoading(true);
    try {
      const passData = {
        user_id: Id, // Use user ID from the URL
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        industry_type: formData.industry_type,
      };

      // Simulated API call
      const response = await editCustomer(passData);

      if (response.code === 200) {
        alert("Customer updated successfully!");
        navigate("/customers"); // Go back to the CustomerTable
      } else {
        setError(response.message || "Failed to update customer.");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/customers"); // Navigate back to the CustomerTable
  };

  return (
    <Box
      sx={{
        maxWidth: 800, // Increased card width
        margin: "50px auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Edit Customer
      </Typography>

      {/* Row 1: First Name & Last Name */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      </Box>

      {/* Row 2: Email & Industry Type */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Industry Type"
          name="industry_type"
          value={formData.industry_type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      </Box>

      {error && (
        <Typography color="error" mt={1} textAlign="center">
          {error}
        </Typography>
      )}

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
        <Button onClick={handleCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditCustomer;
