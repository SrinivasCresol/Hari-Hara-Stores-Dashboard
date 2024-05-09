import { useEffect, useState } from "react";
import { getStoreDetailsFunction } from "../../Services/Apis";
import Layout from "../Common/Layout";

const Details = () => {
  const [data, setData] = useState();

  const getDetails = async () => {
    const id = sessionStorage.getItem("userID");

    try {
      const response = await getStoreDetailsFunction(id);

      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  console.log(data);

  return (
    <Layout>
      {" "}
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6 mt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Store Details</h2>
          <hr className="border-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">{data?.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">PIN Code:</p>
            <p className="text-gray-800">{data?.pinCode}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Role:</p>
            <p className="text-gray-800">{data?.role}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Status:</p>
            <p className="text-gray-800">{data?.status}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Created At:</p>
            <p className="text-gray-800">
              {new Date(data?.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Updated At:</p>
            <p className="text-gray-800">
              {new Date(data?.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
