import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { forgotPasswordFunction } from "../../Services/Apis";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifySuccess = () => {
    toast.success("Mail Sent successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handleForgotPassword = async (data) => {
    setLoading(true);

    const response = await forgotPasswordFunction(data);
    if (response.status === 200) {
      setLoading(false);
      notifySuccess();
      navigate("/");
    }
  };

  return (
    <div>
      <div className="md:grid md:place-items-center md:h-screen h-[100vh] ">
        <div className="w-full xl:w-1/2 bg-white ">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Forgot password?
            </h2>

            <form onSubmit={handleSubmit(handleForgotPassword)}>
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

              <Link to="/">
                <small className="mb-2.5 block font-medium text-black dark:text-white underline float-end">
                  Login
                </small>
              </Link>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
