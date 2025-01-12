import { InvokeApi } from "../../InvokeAPI/UserApi";

export const handleSignUp = async (formData) => {
  const requestObj = {
    url: "/api/admin/signup_admin",
    method: "post",
    headers: {
      "Content-Type": "application/json", 
    },
    data: {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    password: formData.password,
    status: true,
    }
  };
return InvokeApi(requestObj)
}
