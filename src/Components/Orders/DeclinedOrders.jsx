import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { notificationByStoreIDFunction } from "../../Services/Apis";
import BreadCrumb from "../Common/BreadCrumb";
import Layout from "../Common/Layout";

export default function DeclinedOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const storeID = sessionStorage.getItem("storeID");

  const fetchOrders = async () => {
    try {
      const response = await notificationByStoreIDFunction(storeID);

      if (response.status === 200) {
        setOrders(response.data.declinedOrders);
      }
    } catch (error) {
      console.error("Error fetching declined orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const columns = [
    {
      name: "ID",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (rows) => rows.orderDetails.userID.userDetails.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (rows) => rows.orderDetails.userID.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Delivery Status",
      selector: (rows) => rows.orderDetails.deliveryStatus,
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      selector: (rows) => (
        <div className="flex space-x-2 justify-center p-1">
          <Link to={`/order/details/${rows.orderID}`}>
            <small className="border border-green-600 bg-green-100 hover:bg-green-200 hover:cursor-pointer px-2  rounded-sm">
              View
            </small>
          </Link>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <Layout>
      <div className="2xl:px-28 xl:px-16 px-2 md:mt-8 mt-2 mb-5 space-y-6">
        <BreadCrumb pageName="Declined Orders" />

        <div className="p-4 bg-white rounded-lg shadow-md">
          <DataTable
            columns={columns}
            data={orders}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 50]}
            paginationComponentOptions={paginationOptions}
            noHeader
            responsive
            className="text-base"
            theme="solarized"
            onChangePage={(page) => setCurrentPage(page)}
            onChangeRowsPerPage={(perPage) => setRowsPerPage(perPage)}
          />
        </div>
      </div>
    </Layout>
  );
}
