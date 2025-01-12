// // import React from "react";
// // import { TextField, Button } from "@mui/material";
// // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // import { logo } from "../../Images";

// // // Form field configuration
// // const formFields = [
// //   { id: "firstName", label: "First Name", type: "text", required: true },
// //   { id: "lastName", label: "Last Name", type: "text", required: true },
// //   { id: "email", label: "E-mail", type: "email", required: true },
// //   { id: "phone", label: "Phone", type: "text", required: false },
// //   { id: "password", label: "Password", type: "password", required: true },
// //   {
// //     id: "confirmPassword",
// //     label: "Confirm Password",
// //     type: "password",
// //     required: true,
// //   },
// // ];

// // function SignUp() {
// //   return (
// //     <div className="sign-up-container">
// //       <div className="sign-up-row">
// //         {/* Left Section */}
// //         <div className="sign-up-left">
// //           <div className="sign-up-form-container">
// //             {/* Logo */}
// //             <img src={logo} alt="Logo" className="sign-up-logo" />
// //             <h1>Get started with a Forever Free plan</h1>
// //             <p>Sign up in seconds. No credit card required</p>

// //             <form className="sign-up-form">
// //               {/* Generate form fields dynamically */}
// //               {formFields.map((field) => (
// //                 <TextField
// //                   key={field.id}
// //                   id={field.id}
// //                   label={field.label}
// //                   type={field.type}
// //                   required={field.required}
// //                   className="sign-up-input"
// //                 />
// //               ))}
// //               <Button
// //                 variant="contained"
// //                 type="submit"
// //                 className="sign-up-button"
// //               >
// //                 Create My Account
// //               </Button>
// //             </form>
// //           </div>
// //         </div>

// //         {/* Right Section */}
// //         <div className="sign-up-right">
// //           <h2>Try Advanced features for 30 days</h2>
// //           <p>Your 30-day trial of Advanced features includes:</p>
// //           <ul>
// //             <li>
// //               <CheckCircleIcon /> Access to premium features
// //             </li>
// //             <li>
// //               <CheckCircleIcon /> Access to main features
// //             </li>
// //             <li>
// //               <CheckCircleIcon /> Up to 1,000 subscribers
// //             </li>
// //             <li>
// //               <CheckCircleIcon /> Send up to 12,000 emails per month
// //             </li>
// //             <li>
// //               <CheckCircleIcon /> 24/7 live chat support
// //             </li>
// //             <li>
// //               <CheckCircleIcon /> Upgrade anytime
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // export default SignUp;


// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, Button } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { logo } from "../../Images";

// // Form field configuration
// const formFields = [
//   { id: "firstName", label: "First Name", type: "text", required: true },
//   { id: "lastName", label: "Last Name", type: "text", required: true },
//   { id: "email", label: "E-mail", type: "email", required: true },
//   { id: "phone", label: "Phone", type: "number", required: false },
//   { id: "password", label: "Password", type: "password", required: true },
//   { id: "confirmPassword", label: "Confirm Password", type: "password", required: true },
// ];

// function SignUp() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     // Prepare data for API
//     const payload = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//       status: true, // Assuming status is always true
//     };

//     try {
//       // Send POST request
//       const response = await axios.post("http://46.101.67.112:4001/api/admin/signup_admin", payload);

//       // Save response to local storage
//       localStorage.setItem("signupData", JSON.stringify(response.data));

//       alert("SignUp successful!");
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       setError("Failed to sign up. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sign-up-container">
//       <div className="sign-up-row">
//         {/* Left Section */}
//         <div className="sign-up-left">
//           <div className="sign-up-form-container">
//             <img src={logo} alt="Logo" className="sign-up-logo" />
//             <h1>Get started with a Forever Free plan</h1>
//             <p>Sign up in seconds. No credit card required</p>

//             <form className="sign-up-form" onSubmit={handleSubmit}>
//               {formFields.map((field) => (
//                 <TextField
//                   key={field.id}
//                   id={field.id}
//                   label={field.label}
//                   type={field.type}
//                   required={field.required}
//                   className="sign-up-input"
//                   value={formData[field.id]}
//                   onChange={handleInputChange}
//                 />
//               ))}
//               {error && <p style={{ color: "red" }}>{error}</p>}
//               <Button
//                 variant="contained"
//                 type="submit"
//                 className="sign-up-button"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Create My Account"}
//               </Button>
//             </form>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="sign-up-right">
//           <h2>Try Advanced features for 30 days</h2>
//           <p>Your 30-day trial of Advanced features includes:</p>
//           <ul>
//             <li>
//               <CheckCircleIcon /> Access to premium features
//             </li>
//             <li>
//               <CheckCircleIcon /> Access to main features
//             </li>
//             <li>
//               <CheckCircleIcon /> Up to 1,000 subscribers
//             </li>
//             <li>
//               <CheckCircleIcon /> Send up to 12,000 emails per month
//             </li>
//             <li>
//               <CheckCircleIcon /> 24/7 live chat support
//             </li>
//             <li>
//               <CheckCircleIcon /> Upgrade anytime
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;



// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import axios from "axios"; // Import Axios for API calls
// import { logo } from "../../Images"; // Replace with your logo import

// const formFields = [
//   { id: "firstName", label: "First Name", type: "text", required: true },
//   { id: "lastName", label: "Last Name", type: "text", required: true },
//   { id: "email", label: "E-mail", type: "email", required: true },
//   { id: "phone", label: "Phone", type: "text", required: false },
//   { id: "password", label: "Password", type: "password", required: true },
  
// ];

// function SignUp() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Handle input field changes
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [id]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error state
//     setSuccess(""); // Reset success state

//     try {
//       const response = await axios.post("http://46.101.67.112:4001/api/app_api/login", {
//         email: formData.email,
//         password: formData.password,
//         type: 0, // Assuming `type` is always 0 for now
//       });

//       // Save the token and user data in localStorage
//       localStorage.setItem("userData", JSON.stringify(response.data));

//       // Show success message
//       setSuccess("Signup successful! Redirecting...");
      
//       // Redirect or perform further actions
//       setTimeout(() => {
//         window.location.href = "/"; // Redirect to dashboard or any page
//       }, 1500);
//     } catch (error) {
//       // Handle error response
//       setError(error.response?.data?.message || "An error occurred during signup.");
//     }
//   };

//   return (
//     <div className="sign-up-container">
//       <div className="sign-up-row">
//         {/* Left Section */}
//         <div className="sign-up-left">
//           <div className="sign-up-form-container">
//             {/* Logo */}
//             <img src={logo} alt="Logo" className="sign-up-logo" />

//             <h1>Get started with a Forever Free plan</h1>
//             <p>Sign up in seconds. No credit card required</p>

//             <form className="sign-up-form" onSubmit={handleSubmit}>
//               {/* Generate form fields dynamically */}
//               {formFields.map((field) => (
//                 <TextField
//                   key={field.id}
//                   id={field.id}
//                   label={field.label}
//                   type={field.type}
//                   required={field.required}
//                   value={formData[field.id]}
//                   onChange={handleInputChange}
//                   className="sign-up-input"
//                 />
//               ))}
//               {/* Submit Button */}
//               <Button variant="contained" type="submit" className="sign-up-button">
//                 Create My Account
//               </Button>
//             </form>

//             {/* Success/Error Messages */}
//             {success && <p style={{ color: "green" }}>{success}</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="sign-up-right">
//           <h2>Try Advanced features for 30 days</h2>
//           <p>Your 30-day trial of Advanced features includes:</p>
//           <ul>
//             <li>
//               <CheckCircleIcon /> Access to premium features
//             </li>
//             <li>
//               <CheckCircleIcon /> Access to main features
//             </li>
//             <li>
//               <CheckCircleIcon /> Up to 1,000 subscribers
//             </li>
//             <li>
//               <CheckCircleIcon /> Send up to 12,000 emails per month
//             </li>
//             <li>
//               <CheckCircleIcon /> 24/7 live chat support
//             </li>
//             <li>
//               <CheckCircleIcon /> Upgrade anytime
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;


import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { logo } from "../../Images";
import { handleSignUp } from "../../DAL/AdminUser/Signup";
import { useNavigate } from "react-router-dom";

const formFields = [
  { id: "firstName", label: "First Name", type: "text", required: true },
  { id: "lastName", label: "Last Name", type: "text", required: true },
  { id: "email", label: "E-mail", type: "email", required: true },
  { id: "phone", label: "Phone", type: "number", required: false },
  { id: "password", label: "Password", type: "password", required: true },
  { id: "confirmPassword", label: "Confirm Password", type: "password", required: true },
];

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }
    try {
    const result = await handleSignUp(formData);
    console.log("it's result in signup component", result)
    if (result.success) {
      setSuccess(result.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      console.log(result.message)
      setError(result.message  || "An unexpected error occurred.");
    }
    if(result.code === 200){
      navigate('/signin')
    }
  } catch (err) {
    console.error("Unexpected Error in Signup:", err);
    setError(err.message || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
  };
  return (
    <div className="sign-up-container">
      <div className="sign-up-row">
        <div className="sign-up-left">
          <div className="sign-up-form-container">
            <img src={logo} alt="Logo" className="sign-up-logo" />
            <h1>Get started with a Forever Free plan</h1>
            <p>Sign up in seconds. No credit card required</p>
            <form className="sign-up-form" onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <TextField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  required={field.required}
                  className="sign-up-input"
                  value={formData[field.id]}
                  onChange={handleInputChange}
                />
              ))}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <Button
                variant="contained"
                type="submit"
                className="sign-up-button"
                disabled={loading}
              >
                {loading ? "Loading..." : "Create My Account"}
              </Button>
            </form>
          </div>
        </div>
        <div className="sign-up-right">
          <h2>Try Advanced features for 30 days</h2>
          <p>Your 30-day trial of Advanced features includes:</p>
          <ul>
            <li><CheckCircleIcon /> Access to premium features</li>
            <li><CheckCircleIcon /> Access to main features</li>
            <li><CheckCircleIcon /> Up to 1,000 subscribers</li>
            <li><CheckCircleIcon /> Send up to 12,000 emails per month</li>
            <li><CheckCircleIcon /> 24/7 live chat support</li>
            <li><CheckCircleIcon /> Upgrade anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
