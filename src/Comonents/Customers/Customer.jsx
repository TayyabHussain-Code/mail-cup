import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { handleCustomer } from "../../DAL/AdminUser/Customer";
import AddCustomerModal from "./NewCustomer";
import { InvokeApi } from "../../InvokeAPI/UserApi";
import { useNavigate } from "react-router-dom";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const open = Boolean(anchorElMap);
  const navigate = useNavigate();
  //  customer data from API
  const customerData = async (e) => {
    try {
      const result = await handleCustomer();
      console.log("it's our result in customer", result.customer);
      if (result.code === 200) {
        setCustomers(result.customer);
      }
    } catch (error) {
      console.error("Unexpected Error in Signup:", error);
      // setError(error.message || "An unexpected error occurred.");
    }
  };
  useEffect(() => {
    customerData();
  }, []);

  // const handleMenuClick = (event, customer) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedCustomer(customer);
  //   console.log("in return customer data", customer)
  // };
  const handleMenuClick = (event, customerId) => {
    setAnchorElMap((prev) => ({ ...prev, [customerId]: event.currentTarget }));
    setSelectedCustomer(customerId); // Store the specific customer ID
    console.log("icon click specific customerID", customerId)
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   setSelectedCustomer(null);
  // };
  const handleMenuClose = (customerId) => {
    setAnchorElMap((prev) => ({ ...prev, [customerId]: null }));
  };

  const handleEdit = async (customer) => {
    const Id = customer.user?._id;
    navigate(`/edit-customer/${Id}`, { state: customer });
  };

  const handleDelete = async (customer) => {
    // setAnchorElMap(event.currentTarget);
    // setSelectedCustomer(customer);
    const adminToken = localStorage.getItem("token");
    const Id = customer.user?._id;
    console.log("delete send to delete", customer);
    console.log("it's id data", Id);
    const requestObj = {
      url: "/api/customer/delete_customer/" + Id,
      method: "delete",
      headers: {
        "x-sh-auth": adminToken,
      },
    };
    try {
      const delteresult = await InvokeApi(requestObj);
      console.log(delteresult);
      if (delteresult.code === 200) {
      }
    } catch (error) {
      console.error("Unexpected Error in deleting", error);
    }
  };

  const handleHealthStatus = () => {
    console.log("Health status:", selectedCustomer);
    handleMenuClose();
  };

  const handleOpenAddCustomer = () => {
    setIsModalOpen(true); // Open Modal
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5">Customers</Typography>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenAddCustomer}
          >
            + Add Customer
          </Button>
          <TextField
            label="Search Customer"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table style={{ minWidth: "1200px" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "50px" }}>#</TableCell>
              <TableCell style={{ minWidth: "150px" }}>First Name</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Last Name</TableCell>
              <TableCell style={{ minWidth: "250px" }}>Email</TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Account Status
              </TableCell>
              <TableCell style={{ minWidth: "200px" }}>
                Subscription Status
              </TableCell>
              <TableCell style={{ minWidth: "200px" }}>Domain</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Created At</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Updated At</TableCell>
              <TableCell style={{ minWidth: "100px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={customer._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.first_name}</TableCell>
                <TableCell>{customer.last_name}</TableCell>
                <TableCell>{customer.user?.email}</TableCell>
                <TableCell>
                  <span style={{ color: "green" }}>
                    {customer.account_status}
                  </span>
                </TableCell>
                <TableCell>{customer.subscription_status}</TableCell>
                <TableCell>{customer.domain || "N/A"}</TableCell>
                <TableCell>
                  {new Date(customer.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(customer.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => handleMenuClick(event, customer._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}> */}
                  <Menu
                    anchorEl={anchorElMap[customer._id]} // Use row-specific anchorEl
                    open={Boolean(anchorElMap[customer._id])}
                    onClose={() => handleMenuClose(customer._id)}
                  >
                    <MenuItem onClick={(e) => handleEdit(customer, index)}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => handleDelete( customer)}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem onClick={handleHealthStatus}>
                      Health Status
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add Customer Modal */}
      {isModalOpen && (
        <AddCustomerModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
export default CustomerTable;
