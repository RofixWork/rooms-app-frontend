import axios from "axios";

const instance = axios.create({
  baseURL: "https://rooms-app-backend.vercel.app/api/v1",
});
export default instance;
