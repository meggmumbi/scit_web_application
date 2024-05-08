import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postDepartment = async (values) => {
   
  return await axios.post(`${apiRoutes.scit_department}`, values);
};

export const updateDepartment = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.scit_department}/${id}`, values);
  
};

export const deleteDepartment = async (id) => {
 
  let url = `${apiRoutes.scit_department}/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getDepartments = async ({ queryKey }) => {

  let url = `${apiRoutes.scit_department}`;

  return await axios.get(url);
};

