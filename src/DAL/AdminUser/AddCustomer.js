import { InvokeApi } from "../../InvokeAPI/UserApi"

export const AddNewCustomer = async (formData) =>{
const requestObj = {
    url:"/api/customer/signup_customer",
    method:"post",
    headers: {
        "Content-Type":"application/json"
    },
    data:{
        "first_name":formData.first_name,
        "last_name":formData.last_name,
        "email":formData.email,
        "password":formData.password,
        "industry_type":formData.industry_type,
        "customer_type":formData.customer_type,
    }
}
return InvokeApi(requestObj);
}
