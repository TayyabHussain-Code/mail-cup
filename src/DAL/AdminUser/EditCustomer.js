import { InvokeApi } from "../../InvokeAPI/UserApi"

export const editCustomer = async(passData) => {
    const token = localStorage.getItem("token")
    const requestObj= {
        url:"/api/customer/edit_customer_by_admin/" +passData.user_id,
        method:"put",
        headers:{
            "x-sh-auth":token
        },
        data:{
            "first_name":passData.first_name,
            "last_name":passData.last_name,
            "email":passData.email,
            "industry_type":passData.industry_type
        }
    };
    return InvokeApi(requestObj)
}