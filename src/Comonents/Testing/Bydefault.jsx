// import React, { useState } from "react";
// import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { background, logo } from "../../Images";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       <section className="login">
//         <div className="container-fluid">
//           <div className="row d-flex justify-content-between">
//             <div className="col-6 mt-5">
//               <div className="logo-img">
//                 <img src={logo} alt="" />
//               </div>

//               <div className="login-page">
//                 <h1>Sign in to your Mail-cub Account</h1>
//                 <p>
//                   Don't have an account yet? <b>Sign up</b>
//                 </p>
//                 <form>
//                   {/* Email Input */}
//                   <div className="mb-3">
//                     <TextField
//                       label="Email"
//                       type="email"
//                       variant="outlined"
//                       fullWidth
//                       required
//                     />
//                   </div>

//                   {/* Password Input */}
//                   <div className="mb-3">
//                     <TextField
//                       label="Password"
//                       type={showPassword ? "text" : "password"}
//                       variant="outlined"
//                       fullWidth
//                       required
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton onClick={handleTogglePasswordVisibility} edge="end">
//                               {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </div>

//                   {/* Forget Password */}
//                   <div className="mb-3">
//                     <a href="#">
//                       <b>Forget your Password?</b>
//                     </a>
//                   </div>

//                   {/* Sign In Button */}
//                   <div className="sign-bttn">
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="success"
//                       fullWidth
//                       style={{ textTransform: "none" }}
//                     >
//                       Sign In
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div className="col-6">
//               <div className="login-img">
//                 <img src={background} alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default LoginPage;