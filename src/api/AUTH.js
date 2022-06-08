import axios from "axios";
import qs from "qs";

export const login = async (credentials) => {
  const axiosConfig = {
    baseURL: process.env.REACT_APP_IDENTITY_SERVER_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const requestData = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    grant_type: "password",
    username: credentials.username,
    password: credentials.password,
    scope: process.env.REACT_APP_STANDARD_SCOPES,
  };

  try {
    const result = await axios.post(
      "/connect/token",
      qs.stringify(requestData),
      axiosConfig
    );
    localStorage.removeItem("access_token");
    localStorage.setItem("access_token", result?.data?.access_token);
  } catch (err) {
    return err;
  }
};
