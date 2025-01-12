import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { handleAdminChangePassword } from "../../DAL/AdminUser/ChangePasword";

const ChangePasswordModal = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Toggle Password Visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle Password Change API
  const handleChangePassword = async () => {
    setError(""); // Reset previous error
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await handleAdminChangePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      // Success handling can be added here
      if (result.code === 200) {
        alert("Password changed successfully!");
        onClose(); // Close modal on success
      } else {
        setError(result.message || "Something went wrong!");
      }
    } catch (error) {
      setError(error.result?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          margin: "100px auto",
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Change Your Admin Password
        </Typography>

        <TextField
          fullWidth
          label="Old Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="New Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
