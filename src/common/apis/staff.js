import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postStaff = async (values) => {
   
  return await axios.post(`${apiRoutes.scit_staff}`, values);
};

export const updateStaff = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.scit_staff}/${id}`, values);
  
};

export const deleteStaff = async (id) => {
 
  let url = `${apiRoutes.scit_staff}/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getstaff = async ({ queryKey }) => {

  let url = `${apiRoutes.scit_staff}`;

  return await axios.get(url);
};

