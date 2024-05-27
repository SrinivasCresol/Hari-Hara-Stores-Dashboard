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

// Password Change

export const passwordChangeFunction = async (data, id, header) => {
  return await commonRequest(
    "POST",
    `${BASE_URL}/password-change/${id}`,
    data,
    header
  );
};

// Store Owners

export const getStoreOwnersFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/store-owners`);
};

// Add Store Details

export const addStoreDetailsFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/store/create`, data, header);
};

// Notifications By Store ID

export const notificationByStoreIDFunction = async (storeID) => {
  return await commonRequest("GET", `${BASE_URL}/notifications/get/${storeID}`);
};

// Update Order Accept Or Decline Status By NotificationID

export const updateOrderStatusFunction = async (
  notificationID,
  data,
  header
) => {
  return await commonRequest(
    "PUT",
    `${BASE_URL}/notifications/update/${notificationID}`,
    data,
    header
  );
};

// All Orders

export const allOrdersByOrderIDFunction = async (orderID) => {
  return await commonRequest("GET", `${BASE_URL}/orders/${orderID}`);
};
