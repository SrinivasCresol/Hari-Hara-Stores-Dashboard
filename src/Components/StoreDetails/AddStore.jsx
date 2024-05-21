import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../Common/Layout";
import BreadCrumb from "../Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import {
  addStoreDetailsFunction,
  getStoreOwnersFunction,
} from "../../Services/Apis";

export default function AddStore() {
  const [loading, setLoading] = useState(false);
  const [storeOwner, setStoreOwner] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifySuccess = () => {
    toast.success("Store Name added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const fetchStoreOwners = async () => {
    try {
      const response = await getStoreOwnersFunction();

      if (response.status === 200) {
        setStoreOwner(response.data.allStoreOwners);
      }
    } catch (error) {
      console.error("Error fetching store owners:", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = {
        storeOwnerID: data.storeOwnerID,
        kitchenName: data.kitchenName,
        address: data.address,
        city: data.city,
        pinCode: data.pinCode,
        kitchenOpeningTime: data.kitchenOpeningTime,
        kitchenClosingTime: data.kitchenClosingTime,
        location: {
          type: "Point",
          coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
        },
        mobileNumber: data.mobileNumbers.split(","),
      };

      const response = await addStoreDetailsFunction(formData);

      if (response.status === 200) {
        notifySuccess();
        setLoading(false);
        navigate("/details");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStoreOwners();
  }, []);

  return (
    <div>
      <Layout>
        <div className="2xl:px-28 xl:px-16 px-2 md:mt-8 mt-2">
          <BreadCrumb pageName="Add New Store" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 border rounded-lg shadow-md bg-white grid md:grid-cols-2 grid-cols-1 gap-8 p-4"
          >
            <div className="grid">
              <select
                {...register("storeOwnerID", {
                  required: "Store Owner ID is required",
                })}
                className="mt-1 p-2 border w-full"
              >
                <option value="">Select an Option</option>
                {storeOwner.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.email}
                  </option>
                ))}
              </select>
              {errors.storeOwnerID && (
                <small className="text-red-500">
                  {errors.storeOwnerID.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("kitchenName", {
                  required: "Kitchen Name is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter Kitchen Name"
              />
              {errors.kitchenName && (
                <small className="text-red-500 text-start">
                  {errors.kitchenName.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("address", {
                  required: "Address is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter Address"
              />
              {errors.address && (
                <small className="text-red-500 text-start">
                  {errors.address.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("city", {
                  required: "City is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter City"
              />
              {errors.city && (
                <small className="text-red-500 text-start">
                  {errors.city.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="time"
                {...register("kitchenOpeningTime", {
                  required: "Kitchen Opening Time is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
              />
              {errors.kitchenOpeningTime && (
                <small className="text-red-500 text-start">
                  {errors.kitchenOpeningTime.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="time"
                {...register("kitchenClosingTime", {
                  required: "Kitchen Closing Time is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
              />
              {errors.kitchenClosingTime && (
                <small className="text-red-500 text-start">
                  {errors.kitchenClosingTime.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("mobileNumbers", {
                  required: "Mobile Numbers are required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter Mobile Numbers (comma-separated)"
              />
              {errors.mobileNumbers && (
                <small className="text-red-500 text-start">
                  {errors.mobileNumbers.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("pinCode", {
                  required: "Pin Code is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter Pin Code"
              />
              {errors.pinCode && (
                <small className="text-red-500 text-start">
                  {errors.pinCode.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("latitude", {
                  required: "Latitude is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter Latitude"
              />
              {errors.latitude && (
                <small className="text-red-500 text-start">
                  {errors.latitude.message}
                </small>
              )}
            </div>

            <div className="grid">
              <input
                type="text"
                {...register("longitude", {
                  required: "Longitude is required",
                })}
                className="focus:outline-none  p-2 border rounded-md"
                placeholder="Enter Longitude"
              />
              {errors.longitude && (
                <small className="text-red-500 text-start">
                  {errors.longitude.message}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="col-span-2 w-1/4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-[#007dc2] hover:text-white transition duration-300"
            >
              {loading ? "Creating Store..." : "Create Store"}
            </button>
          </form>
          <ToastContainer />
        </div>
      </Layout>
    </div>
  );
}
