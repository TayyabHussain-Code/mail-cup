import { InvokeApi } from "../../InvokeAPI/UserApi"

export const handleCustomer = async () => {
    const authToken = localStorage.getItem("token")
    const requestObj ={
        url:"/api/customer/get_customers",
        method: "post",
        headers: {
            "x-sh-auth": authToken
        }
    }
    return InvokeApi(requestObj)
}