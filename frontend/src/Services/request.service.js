import axios from "axios";
import config from "../environments/config";

const apiUrl = config.apiUrl;

const requestHeaders = (token) => {
  const headerConfig = {
    Accept: "application/json",
  };

  if (token) {
    return {
      ...headerConfig,
      Authorization: `Bearer ${token}`,
    };
  }
  return headerConfig;
};

export const getRequest = async (endpoint, token = null) => {
  try {
    const response = await axios.get(apiUrl + endpoint, {
      withCredentials: false,
      headers: requestHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`API request failed: ${error.message}`);
  }
};

export const postRequest = async (endpoint, body, token = null) => {
  try {
    const response = await axios.post(apiUrl + endpoint, body, {
      withCredentials: true,
      headers: requestHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`API request failed: ${error.message}`);
  }
};
