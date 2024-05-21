import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline, MdVpnLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginFunction } from "../../Services/Apis";

export default function LoginAuth() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifySuccess = () => {
    toast.success("Login successfully!", {
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

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await loginFunction(data);
      if (
        response.status === 200 &&
        response.data.result.validateUser.role === "StoreOwner"
      ) {
        setLoading(true);
        notifySuccess();
        sessionStorage.setItem("token", response.data.result.token);
        sessionStorage.setItem(
          "storeOwnerID",
          response.data.result.validateUser.userId
        );
        navigate("/dashboard");
      } else {
        notifyError("Invalid Credentials, please verify them and retry");
        setServerError("Invalid Credentials, please verify them and retry");
        setLoading(false);
      }
    } catch (error) {
      console.error("Catch Block Error:", error);
      notifyError(error);
      setServerError(
        "There was an error processing your request. Please try again."
      );
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return;

  return (
    <div className="md:grid md:place-items-center md:h-screen h-[100vh] ">
      <div className="w-full xl:w-1/2 bg-white ">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Store Login
          </h2>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-blue-500 focus-visible:shadow-none"
                />

                <span className="absolute right-4 top-4">
                  <MdOutlineMailOutline />
                </span>
              </div>
              {errors.email && (
                <small className="text-red-500 text-start">
                  {errors.email.message}
                </small>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  id="password"
                  placeholder="Enter Password"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-blue-500 focus-visible:shadow-none"
                />

                <span className="absolute right-4 top-4">
                  <MdVpnLock />
                </span>
              </div>

              {errors.password && (
                <small className="text-red-500 text-start">
                  {errors.password.message}
                </small>
              )}
            </div>

            <Link to="/forgot-password">
              <small className="mb-2.5 block font-medium text-black dark:text-white underline float-end">
                Forgot password?
              </small>
            </Link>

            {serverError && (
              <div className="text-red-500 text-center">
                <small>{serverError}</small>
              </div>
            )}

            <div className="mb-5">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
              <ToastContainer autoClose={1000} position="top-right" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
