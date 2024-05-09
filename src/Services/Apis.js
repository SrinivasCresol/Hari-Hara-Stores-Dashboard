import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./Helper";

// Login Function

export const loginFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/login`, data);
};

// Store Details by ID

export const getStoreDetailsFunction = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/user/${id}`);
};

// Forgot Password

export const forgotPasswordFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/forgot-password`, data);
};

//password-change
export const passwordChangeFunction = async (data, id, header) => {
  return await commonRequest(
    "POST",
    `${BASE_URL}/password-change/${id}`,
    data,
    header
  );
};
