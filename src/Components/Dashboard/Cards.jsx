import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Layout from "../Common/Layout";
import PropTypes from "prop-types";
import { notificationByStoreIDFunction } from "../../Services/Apis";

export default function Cards() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalAcceptedOrders: 0,
    totalDeclinedOrders: 0,
    totalOrders: 0,
  });
  const storeID = sessionStorage.getItem("storeID");

  const fetchData = async () => {
    try {
      const response = await notificationByStoreIDFunction(storeID);
      if (response.status === 200) {
        setData({
          totalAcceptedOrders: response.data.acceptedOrders.length,
          totalDeclinedOrders: response.data.declinedOrders.length,
          totalOrders: response.data.allAssignedOrders.length,
        });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    {
      icon: <FaShoppingCart />,
      name: "Total Orders",
      number: data.totalOrders,
    },
    {
      icon: <FaShoppingCart />,
      name: "Total Accepted Orders",
      number: data.totalAcceptedOrders,
    },
    {
      icon: <FaShoppingCart />,
      name: "Total Declined Orders",
      number: data.totalDeclinedOrders,
    },
  ];

  return (
    <Layout>
      <div className="flex flex-wrap gap-4 2xl:px-28 xl:px-16 px-2 md:mt-8 mt-2 space-y-4 sm:space-y-0">
        {loading ? (
          <p>Loading...</p>
        ) : (
          cards.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              name={card.name}
              number={card.number}
            />
          ))
        )}
      </div>
    </Layout>
  );
}

const Card = ({ icon, name, number }) => (
  <div className="grow-[1] basis-[200px] bg-white p-6  shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
    <div className="flex items-center justify-between">
      <span className="text-xl">{icon}</span>
      <span className="text-2xl font-bold text-orange-600">{number}</span>
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  </div>
);

Card.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
