import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postActivity = async (values) => {
   
  return await axios.post(`${apiRoutes.scit_activity}`, values);
};

export const updateActivity = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.scit_activity}/${id}`, values);
  
};

export const deleteActivity = async (id) => {
 
  let url = `${apiRoutes.scit_activity}/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getActivity = async ({ queryKey }) => {

  let url = `${apiRoutes.scit_activity}`;

  return await axios.get(url);
};

