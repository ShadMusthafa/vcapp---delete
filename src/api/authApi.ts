/* import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-hot-toast";

const vcpApi = axios.create({
  baseURL: "https://be-invent-dxgx.onrender.com/api",
  withCredentials: true,
});
//credentials: 'include',

export const registerUser = async (userData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.post(
      "/user/register",
      userData
    );

    if (response.statusText === "OK") {
      toast.success("User registered successfully!");
    }
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message =
      (err.response && err.response.data && err.response.statusText) ||
      err.message ||
      err.toString();
    toast.error(message);
  }
};

export const loginUser = async (userData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.post("/user/login", userData);

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await vcpApi.get("/user/logout");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.get("user/loggedin");

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const forgotPassword = async (userData: any): Promise<void> => {
  try {
    const response: AxiosResponse = await vcpApi.post(
      "/user/forgot-password",
      userData
    );

    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const resetPassword = async (
  userData: any,
  resetToken: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.put(
      `/user/reset-password/${resetToken}`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getUser = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.get("/user/profile");

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const addNewItem = async (newItem: any): Promise<any> => {
  const response: AxiosResponse = await vcpApi.post("/products", newItem);
  return response.data;
};

export const getAllItems = async (): Promise<any> => {
  const response: AxiosResponse = await vcpApi.get("/products");
  return response.data;
};

export const getSingleItem = async (id: string): Promise<any> => {
  const response: AxiosResponse = await vcpApi.get(`/products/${id}`);
  return response.data;
};

export const updateSingleItem = async (
  id: string,
  formData: any
): Promise<any> => {
  const response: AxiosResponse = await vcpApi.patch(
    `/products/${id}`,
    formData
  );
  return response.data;
};

export const deleteItem = async (id: string): Promise<any> => {
  const response: AxiosResponse = await vcpApi.delete(`/products/${id}`);
  return response.data;
};

export const updateUserProfile = async (formData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.patch(
      "/user/update-profile",
      formData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updatePassword = async (formData: any): Promise<void> => {
  try {
    const response: AxiosResponse = await vcpApi.patch(
      "/user/update-password",
      formData
    );

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const sendContactMessage = async (message: any): Promise<any> => {
  try {
    const response: AxiosResponse = await vcpApi.post("/contact", message);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
 */
