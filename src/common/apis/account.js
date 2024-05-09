import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postSignup = async (values) => {
   
  return await axios.post(`${apiRoutes.scit_account}/signup`, values);
};

export const postLogin = async (values) => {
   
    return await axios.post(`${apiRoutes.scit_account}/login`, values);
};