import axios, { Axios } from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://real-estate-server-navy.vercel.app/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email) => {
  try {
    await api.post(`/user/register`, { email });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email) => {
  try {
    await api.post(`/user/bookVisit/${propertyId}`, {
      email,
      id: propertyId,
      date: dayjs(date).format("DD/MM/YYYY"),
    });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const removeBooking = async (id, email) => {
  try {
    await api.post(`/user/removeBooking/${id}`, {
      email,
    });
  } catch (error) {
    toast.error("Something went wrong. Please try again");
    throw error;
  }
};

export const toFav = async (id, email) => {
  try {
    await api.post(`/user/toFav/${id}`, { email });
  } catch (error) {
    throw error;
  }
};

export const getAllFav = async (email) => {
  try {
    // console.log("in try")
    const res = await api.post(`/user/allFav`, { email });
    // console.log("after api")
    // console.log(res)
    return res.data("favResidenciesID");
  } catch (error) {
    toast.error("Something went wrong while fetching favs");
    throw error;
  }
};

export const getAllBookings = async (email) => {
  try {
    const res = await api.post(`/user/allBookings`, {
      email,
    });
    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};

export const createResidency = async (data) => {
  console.log(data)
  try {
    const res = await api.post(`/residency/create`, {
      data,
    });
  } catch (error) {
    throw error;
  }
};
