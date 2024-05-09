import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postApplication = async (values) => {
   
  return await axios.post(`${apiRoutes.scit_applications}`, values);
};

export const updateApplication = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.scit_applications}/${id}`, values);
  
};

export const deleteApplication = async (id) => {
 
  let url = `${apiRoutes.scit_applications}/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getApplications = async ({ queryKey }) => {

  let url = `${apiRoutes.scit_applications}`;

  return await axios.get(url);
};

