import { InvokeApi } from "../../InvokeAPI/UserApi"

export const handleAdminChangePassword = async ({oldPassword,newPassword,confirmPassword}) => {
    const authToken = localStorage.getItem("token")
    const requestObj ={
        
        url:"/api/app_api/change_password",
        method: "put",
        headers:{
            "x-sh-auth":authToken,
            "Content-Type":"application/json"
        },
        data:{
            "old_password":oldPassword,
            "new_password":newPassword,
            "confirm_password":confirmPassword,
        }
    }
    return InvokeApi(requestObj);
}
