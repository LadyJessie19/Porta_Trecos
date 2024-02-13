import axios from "axios";

export default axios.create({
  baseURL: "https://metavagasbackend-production.up.railway.app/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
