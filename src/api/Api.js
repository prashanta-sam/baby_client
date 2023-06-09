// api.js
import axios from 'axios';
import siteConfig from '../siteConfig';
//const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

const api = axios.create({
  baseURL: `${siteConfig.apiUrl}`,
});
const makeApiName=(name)=>{
    return name.startsWith('/') ? name : '/'+name
}
export const getJson = async (api_name) => {
  try {
    const response = await api.get(makeApiName(api_name));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const postForm=async (api_name,formData)=>{
    // var formData = new FormData();
    // var imagefile = document.querySelector('#file');
    // formData.append("image", imagefile.files[0]);
    try {
        const res = await api.post(api_name, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',            
            }
        })
      
        return res.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }

}

export const postJson=async (api_name,jsonData)=>{
  // var formData = new FormData();
  // var imagefile = document.querySelector('#file');
  // formData.append("image", imagefile.files[0]);
  try {
      const res = await api.post(makeApiName(api_name), jsonData, {
          headers: {
          'Content-Type': 'application/json'
          }
      })
      return res;
    } catch (error) {
      throw new Error(error.response.data.error);
    }

}