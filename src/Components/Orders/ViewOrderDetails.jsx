import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Common/Layout";
import BreadCrumb from "../Common/BreadCrumb";
import { allOrdersByOrderIDFunction } from "../../Services/Apis";

export default function ViewOrderDetails() {
  const [orderData, setOrderData] = useState(null);
  const { orderID } = useParams();

  const getOrderDetails = async () => {
    const response = await allOrdersByOrderIDFunction(orderID);
    if (response.status === 200) {
      setOrderData(response.data.order);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderID]);

  return (
    <Layout>
      <div className="2xl:px-28 xl:px-16 px-2 md:mt-8 mt-2 mb-5 space-y-6">
        <BreadCrumb pageName="Order Details" />

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="font-semibold text-center text-3xl">Order Details</h1>
          {orderData && (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {orderData?.userID?.userDetails.name}
                  </p>
                  {orderData?.nutritionistID?.nutritionistDetails && (
                    <p>
                      <span className="font-semibold">Nutritionist Name:</span>{" "}
                      {orderData?.nutritionistID?.nutritionistDetails.name}
                    </p>
                  )}
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {orderData.orderID}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Status:</span>{" "}
                    {orderData.deliveryStatus}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-6 mb-4">Products</h3>
              <div className="grid grid-cols-3 gap-4">
                {orderData.products.map((product, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <img
                      src={product.productId.imageUrl}
                      alt={product.productId.name}
                      className="w-[100px] mb-2"
                    />
                    <p>
                      <span className="font-semibold">Product Name:</span>{" "}
                      {product.productId.name} ({product.productId.type})
                    </p>
                    {product.type && (
                      <p>
                        <span className="font-semibold">Type:</span>{" "}
                        {product.type}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
