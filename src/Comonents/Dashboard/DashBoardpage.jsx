
// import React, { useState } from "react";
// import { Box, Card, CardContent, Typography } from "@mui/material";
// import { Dashboard, People, SupportAgent } from "@mui/icons-material";

// const Dashboards = () => {
//   // Initialize state for card data
//   const [cardData] = useState([
//     {
//       id: 1,
//       title: "Dashboard",
//       icon: <Dashboard fontSize="large" />,
//       value: "150",
//       backgroundColor: "#C8FACD",
//     },
//     {
//       id: 2,
//       title: "Customers",
//       icon: <People fontSize="large" />,
//       value: "250",
//       backgroundColor: "#D1E9FC",
//     },
//     {
//       id: 3,
//       title: "Support Tickets",
//       icon: <SupportAgent fontSize="large" />,
//       value: "50",
//       backgroundColor: "#FFE7D9",
//     },
//   ]);

//   return (
//     <>
//       <h2>Hi, welcome back</h2>
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: "16px",
//           padding: "16px",
//         }}
//       >
//         {cardData.map((card) => (
//           <Card
//             key={card.id}
//             sx={{
//               backgroundColor: card.backgroundColor, // Applied background color
//               flex: "1 1 calc(33.333% - 16px)", // 3 cards per row
//               maxWidth: "calc(33.333% - 16px)", // Ensure cards don't exceed row
//               minWidth: "260px", // Minimum width for smaller screens
//               height: "260px", // Make it square
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: "8px",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               transition: "transform 0.2s, box-shadow 0.2s",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
//               },
//             }}
//           >
//             <CardContent
//               sx={{
//                 textAlign: "center",
//               }}
//             >
//               {/* Icon */}
//               <Box sx={{ color: "#10a37f", marginBottom: 1 }}>{card.icon}</Box>
//               {/* Data */}
//               <Typography variant="h4" sx={{ color: "#303134" }}>
//                 {card.value}
//               </Typography>
//               {/* Title */}
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", marginBottom: 2 }}
//               >
//                 {card.title}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </>
//   );
// };

// export default Dashboards;

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Dashboard, People, SupportAgent } from "@mui/icons-material";
import { InvokeApi } from "../../InvokeAPI/UserApi";

const Dashboards = () => {

  
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "Total Users",
      icon: <Dashboard fontSize="large" />,
      value: "",
      backgroundColor: "#C8FACD",
    },
    {
      id: 2,
      title: "VeriFied Domain",
      icon: <People fontSize="large" />,
      value: "",
      backgroundColor: "#D1E9FC",
    },
    {
      id: 3,
      title: "Unverified Domain",
      icon: <SupportAgent fontSize="large" />,
      value: "",
      backgroundColor: "#FFE7D9",
    },
  ]);
  console.log(cardData)
  const token = localStorage.getItem("token");
  // const authToken = token.token
  console.log(token)
  const ApiData = async () =>{
    const requestObj = {
      url:"/api/admin/dashboard",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-sh-auth": token,
      },
    };
    try{
    const result = await InvokeApi(requestObj);
    console.log(result)
    setCardData((cardData) => [{...cardData[0], value:result.users},
      {...cardData[1],value:result.verified_domain_count},
    {...cardData[2],value:result.not_verified_domain_count},
    ])
    }
    catch(error){
      console.error("Unexpected Error in Signup:", error);
    }
  };
  
  useEffect(() => {
    ApiData();
  }, []);

  return (
    <>
    <h2>Hi, Welcome back</h2>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: "16px",
        padding: "16px",
      }}
    >
      {cardData.map((card) => (
        <Card
          key={card.id}
          sx={{
            backgroundColor: card.backgroundColor,
            width: "100%",
            maxWidth: 400, // Maximum width for each card
            minWidth: 420, // Minimum width for each card
            display: "flex",
            height: 320,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Box sx={{ fontSize: "50px" }}>{card.icon}</Box>
            <Typography variant="h4" sx={{  marginTop: "8px" }}>
              {card.value}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: "8px",fontWeight: "bold"  }}>
              {card.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </>
  );
};

export default Dashboards;