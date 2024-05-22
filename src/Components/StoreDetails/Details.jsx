import { useEffect, useState } from "react";
import { getStoreDetailsFunction } from "../../Services/Apis";
import Layout from "../Common/Layout";
import { Link } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState();
  const [showButton, setShowButton] = useState(false);

  const getDetails = async () => {
    const id = sessionStorage.getItem("storeOwnerID");

    try {
      const response = await getStoreDetailsFunction(id);

      if (response.status === 200) {
        const storeData = response?.data?.data;
        setData(storeData);
        setShowButton(!storeData?.storeDetails);
      }
    } catch (error) {
      console.error("Error fetching store details:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Layout>
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
          {showButton && (
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to="/add/store">Add Store Details</Link>
              </button>
            </div>
          )}
          {!showButton && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Store Information</h2>
              <div>
                <p className="text-gray-600 font-semibold">Kitchen Name:</p>
                <p className="text-gray-800">
                  {data?.storeDetails.kitchenName}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Kitchen Address:</p>
                <p className="text-gray-800">{data?.storeDetails.address}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">
                  Kitchen Opening Time:
                </p>
                <p className="text-gray-800">
                  {data?.storeDetails.kitchenOpeningTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">
                  Kitchen Closing Time:
                </p>
                <p className="text-gray-800">
                  {data?.storeDetails.kitchenClosingTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">City</p>
                <p className="text-gray-800">{data?.storeDetails.city}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Details;
