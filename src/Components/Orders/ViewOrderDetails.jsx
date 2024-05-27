import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Common/Layout";
import BreadCrumb from "../Common/BreadCrumb";
import { allOrdersByOrderIDFunction } from "../../Services/Apis";
import DataTable from "react-data-table-component";

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

  const columns = [
    {
      name: "Product Image",
      selector: (rows) => (
        <img
          src={rows.productId.imageUrl}
          alt=""
          width="80px"
          className="p-1"
        />
      ),
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (rows) => rows.productId.name,
      sortable: true,
    },
  ];

  return (
    <Layout>
      <div className="2xl:px-28 xl:px-16 px-2 md:mt-8 mt-2 mb-5 space-y-6">
        <BreadCrumb pageName="Order Details" />

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="font-semibold text-center text-3xl">Order Details</h1>
          {orderData && (
            <div className="space-y-6">
              <div>
                <h1 className="font-semibold">Product Details</h1>
                <div className="bg-white border">
                  <DataTable
                    columns={columns}
                    data={orderData?.products}
                    className="text-[16px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
