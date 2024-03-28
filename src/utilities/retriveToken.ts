import axios, { AxiosResponse } from "axios";
import { IUserData } from "../Interfaces/interfaces";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const retrieveToken = async (userData: IUserData) => {
  let token: AxiosResponse<any, any> | undefined = undefined;

  if (userData.name != "" && userData.email != "") {
    try {
      token = await axios.post("http://localhost:3000/create-token", {
        userData,
      });
    } catch (err) {
      toast.error("Invalid token");
    }
  }

  return token?.data.token;
};

export default retrieveToken;
