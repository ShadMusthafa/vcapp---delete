import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

interface UserData {
  userid: string;
  password: string;
}

interface AxiosConfig extends AxiosRequestConfig {
  credentials?: string;
}

interface ContactMessage {
  subject: string;
  message: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const vcpApi = axios.create({
  baseURL: `${baseUrl}/api`,
  // withCredentials: true,
  // credentials: "include",
} as AxiosConfig);

export const registerUser = async (userData: UserData) => {
  try {
    const response = await vcpApi.post("/user/register", userData);

    if (response.statusText === "OK") {
      toast.success("User registered successfully!");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const loginUser = async (userData: UserData) => {
  try {
    // const response = await vcpApi.post("/user/login", userData);
    const response = await vcpApi.post("/Auth", userData);

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    await vcpApi.get("/user/logout");
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await vcpApi.get("user/loggedin");

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const forgotPassword = async (userData: UserData) => {
  try {
    const response = await vcpApi.post("/user/forgot-password", userData);

    toast.success(response.data.message);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const resetPassword = async (userData: UserData, resetToken: string) => {
  try {
    const response = await vcpApi.put(
      `/user/reset-password/${resetToken}`,
      userData
    );

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getUser = async () => {
  try {
    const response = await vcpApi.get("/user/profile");

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

interface FormData {
  picture: string;
  name: string;
  email: string;
  phonenumber: number;
  bio: string;
}

interface ChangePasswordData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

interface ItemData {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image: null;
}

/*interface UpdateFormItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image: string | File | any;
  createdAt: Date;
}*/

export const updateUserProfile = async (formData: FormData) => {
  try {
    const response = await vcpApi.patch("/user/update-profile", formData);

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updatePassword = async (formData: ChangePasswordData) => {
  try {
    const response = await vcpApi.patch("/user/update-password", formData);

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

/* Items */
export const addNewItem = async (newItem: ItemData) => {
  const response = await vcpApi.post("/products", newItem);
  return response.data;
};

export const getAllItems = async () => {
  const response = await vcpApi.get("/products");
  return response.data;
};

export const getSingleItem = async (id: number) => {
  const response = await vcpApi.get(`/products/${id}`);
  return response.data;
};

export const updateSingleItem = async (id: number, formData: any) => {
  const response = await vcpApi.patch(`/products/${id}`, formData);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await vcpApi.delete(`/products/${id}`);
  return response.data;
};

export const sendContactMessage = async (message: ContactMessage) => {
  try {
    const response = await vcpApi.post("/contact", message);

    return response.data;
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(errorMessage);
  }
};
