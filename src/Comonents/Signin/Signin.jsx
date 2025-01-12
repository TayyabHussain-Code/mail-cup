// import { Button, Link, TextField } from "@mui/material";
// import React, { useState } from "react";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import {  useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event) => {
//     event.preventDefault();
//   };
//   const handleSignin = () => {

//   };
//   const hanndleSignUp = () => {
//     navigate("/signup");
//   };
//   return (
//     <div className="container-fluid vh-100 p-0">
//       <div className="row g-0 h-100">
//         <div className="col-md-7 d-flex align-items-center justify-content-center ">
//           <div className="form-container ">
//             <div className="logo mb-4 ml-0">
//               <img
//                 src="https://admin.mailcub.com/static/media/logomailcub.8b4b8be2cc00ff2a0680.png"
//                 alt="Logo"
//                 width="120"
//               />
//             </div>

//             <h3 className="mb-3">Sign in to your Mailcub account</h3>
//             <p className="mb-4">
//               Don't have an account yet?
//               <span onClick={hanndleSignUp} style={{ cursor: "pointer", color: "blue" }}>
//                 {'Sign up'}
//                 </span>
//             </p>

//             <form>
//               <div className="mb-3">
//                 <TextField
//                   id="outlined-required"
//                   label="Email"
//                   sx={{ width: "500px" }}
//                 />
//               </div>
//               <div className="mb-3">
//                 <FormControl sx={{ width: "500px" }} variant="outlined">
//                   <InputLabel htmlFor="outlined-adornment-password">
//                     Password
//                   </InputLabel>
//                   <OutlinedInput
//                     id="outlined-adornment-password"
//                     type={showPassword ? "text" : "password"}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label={
//                             showPassword
//                               ? "hide the password"
//                               : "display the password"
//                           }
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           onMouseUp={handleMouseUpPassword}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Password"
//                   />
//                 </FormControl>
//               </div>
//               <div className="mb-3 text-end">
//                 <Link href="#" underline="none">
//                 {'Forgot your password?'}
//               </Link>
//               </div>
//               <Button
//                 variant="contained"
//                 color="success"
//                 sx={{ width: "500px"}}
//                 onClick={handleSignin}
//               >
//                 Sign In
//               </Button>
//             </form>
//           </div>
//         </div>
//         <div className="col-md-5">
//           <div className="image-column"></div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SignIn;

import { Button, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { handleSignin } from "../../DAL/AdminUser/Login";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData)
  const handleSigninClick = async (e) => {
    try{
      const result = await handleSignin(formData);
      const token = result.token
    console.log(token)
    // const token = JSON.stringify(result)
    localStorage.setItem("token", token)
    if(result.code === 200){
      console.log(result.code)
      navigate('/')
    }
    }
    catch(error){
      console.error("Unexpected Error in Signup:", error);
    setError(error.message || "An unexpected error occurred.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        <div className="col-md-7 d-flex align-items-center justify-content-center">
          <div className="form-container">
            <div className="logo mb-4 ml-0">
              <img
                src="https://admin.mailcub.com/static/media/logomailcub.8b4b8be2cc00ff2a0680.png"
                alt="Logo"
                width="120"
              />
            </div>

            <h3 className="mb-3">Sign in to your Mailcub account</h3>
            <p className="mb-4">
              Don't have an account yet?
              <span
                onClick={handleSignUp}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {"Sign up"}
              </span>
            </p>

            <form>
              <div className="mb-3">
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="outlined-required"
                  label="Email"
                  sx={{ width: "500px" }}
                />
              </div>
              <div className="mb-3">
                <FormControl sx={{ width: "500px" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="mb-3 text-end">
                <Link href="#" underline="none">
                  Forgot your password?
                </Link>
              </div>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "500px" }}
                onClick={handleSigninClick}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
        <div className="col-md-5">
          <div className="image-column"></div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;