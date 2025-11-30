import axios from "axios";

const api = axios.create({
  baseURL: "http://52.78.157.84:8080", 
  
});

export default api;
