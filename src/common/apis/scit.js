import { apiRoutes } from "../routes/apiRoutes";
import axios from "axios";


export const postProgramme = async (values) => {
   
  return await axios.post(`${apiRoutes.scit_programmes}`, values);
};

export const updateProgramme = async (values) => {
  const { id, ...data } = values; 
  
  return await axios.put(`${apiRoutes.scit_programmes}/${id}`, values);
  
};

export const deleteProgramme = async (id) => {
 
  let url = `${apiRoutes.scit_programmes}/${id}`;  
  try {
    const response = await axios.delete(url);
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getProgrammes = async ({ queryKey }) => {

  let url = `${apiRoutes.scit_programmes}`;

  return await axios.get(url);
};

