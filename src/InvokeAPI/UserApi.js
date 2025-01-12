import axios from "axios";
import { apiBaseUrl } from "../confiq";

export const InvokeApi = async(requestObj) =>{
  const apiRequest = {
    ...requestObj, url:apiBaseUrl + requestObj.url
  };
  console.log("it's environment links http data", apiBaseUrl)
  console.log("it's Api request object", apiRequest);
  try{
    const result = await axios (apiRequest)
    console.log("it's our reult data", result.data)
    return result.data
  }
    catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return error.response?.data || error.message;
    }
    };