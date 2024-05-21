import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { passwordChangeFunction } from "../../Services/Apis";
import Layout from "../Common/Layout";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState();

  const id = sessionStorage.getItem("storeOwnerID");

  const notifySuccess = () => {
    toast.success("Password Changed successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const notifyError = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await passwordChangeFunction(id, data);
    if (response.status === 200) {
      notifySuccess();
      setLoading(false);
      reset();
    } else {
      notifyError(response?.response.data.message);
      setLoading(false);
      setOldPasswordError(response?.response.data.message);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            autoComplete="off"
            {...register("oldPassword", {
              required: "Old Password is required",
            })}
            id="oldPassword"
            className="md:p-2 p-1 w-full border"
          />
          <div className="grid">
            {oldPasswordError && (
              <small className="text-red-500 text-start">
                {oldPasswordError}
              </small>
            )}
            {errors.oldPassword && !oldPasswordError && (
              <small className="text-red-500 text-start">
                {errors.oldPassword.message}
              </small>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            autoComplete="off"
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            id="newPassword"
            className="md:p-2 p-1 w-full border"
          />
          {errors.newPassword && (
            <small className="text-red-500 text-start">
              {errors.newPassword.message}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            autoComplete="off"
            {...register("confirmNewPassword", {
              required: "Confirm New Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
            id="confirmNewPassword"
            className="md:p-2 p-1 w-full border"
          />
          {errors.confirmNewPassword && (
            <small className="text-red-500 text-start">
              {errors.confirmNewPassword.message}
            </small>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="md:p-2 p-1 px-4 bg-[#f2f2f2] text-black hover:bg-[#007dc2] hover:text-white"
          >
            {loading ? "Saving New Password..." : "Save New Password"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default ChangePassword;
