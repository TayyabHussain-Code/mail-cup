import { InvokeApi } from "../../InvokeAPI/UserApi"

export const handleSignin = (formData) =>{
    const requestObj = {
        url: "/api/app_api/login",
        method: "post",
        headers: {
            "Content-Type": "application/json", 
          },
          data:{
            email:formData.email,
            password:formData.password,
            type:0
          }
    }
    return InvokeApi(requestObj)
}

export const handleLogOut = () =>{
  const authToken = localStorage.getItem("token");
  const requestObj = {
    url:"/api/app_api/logout",
    method: "get",
    headers: {
      "x-sh-auth": authToken
    }
  }
  return InvokeApi(requestObj)
}