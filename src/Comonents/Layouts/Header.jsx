// import React from "react";
// import { AppBar, Toolbar, Box, Avatar } from "@mui/material";

// const Navbar = () => {
//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         backgroundColor: "#ffff", 
//         color: "#fff",
//         height: 60,
//         justifyContent: "center",
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end", 
//           alignItems: "center",
//           padding: "0 16px",
//           marginRight: "30px",
//           marginTop : "30px"
//         }}
//       >
//         <Avatar
//           sx={{
//             width: 45,
//             height: 45,
//             cursor: "pointer",
//           }}
//         >
//           M
//         </Avatar>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { handleLogOut } from "../../DAL/AdminUser/Login";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../Changepasword/ChangePassword";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const navigate = useNavigate();

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleOpenChangePassword = () => {
    setIsModalOpen(true);
    handleCloseMenu(); // Close the dropdown menu
  };

  const onLogout = async () => {
    try {
      const result = await handleLogOut();
      if (result.code === 200) {
        localStorage.clear("token");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Unexpected Error in Logout:", error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#ffff",
          color: "#fff",
          height: 60,
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 16px",
            marginRight: "50px",
            marginTop: "30px",
          }}
        >
          <Avatar
            sx={{
              width: 55,
              height: 55,
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
          >
            M
          </Avatar>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                minWidth: 250,
                padding: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "& .MuiMenuItem-root": {
                  fontSize: "16px",
                  padding: "12px 20px",
                },
              },
            }}
          >
            <Box ml={2} sx={{ paddingBottom: 1 }}>
              <Typography variant="subtitle1">Meta Logix</Typography>
              <Typography variant="caption">dynamiclogix@gmail.com</Typography>
            </Box>
            <MenuItem onClick={handleOpenChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Change Password Modal */}
      {isModalOpen && (
        <ChangePasswordModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
