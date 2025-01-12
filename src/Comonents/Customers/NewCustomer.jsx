import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AddNewCustomer } from "../../DAL/AdminUser/AddCustomer";

const AddCustomerModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    industry_type: "",
    customer_type: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    const { first_name, last_name, email, password, industry_type, customer_type } = formData;

    if (!first_name || !last_name || !email || !password || !industry_type || !customer_type) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const result = await AddNewCustomer(formData);
      console.log(result);
      alert("Customer added successfully!");
      onClose(); // Close the modal after success
    } catch (err) {
      setError(err.message || "Failed to add customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 600,
          margin: "100px auto",
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Customer
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Industry Type"
          name="industry_type"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Customer Type"
          name="customer_type"
          margin="normal"
          onChange={handleChange}
        />
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddCustomerModal;