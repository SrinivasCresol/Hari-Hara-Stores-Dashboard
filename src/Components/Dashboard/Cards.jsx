import { useState } from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import Layout from "../Common/Layout";
import PropTypes from "prop-types";

export default function Cards() {
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState({
  //     totalUser: 0,
  //     totalNutritionists: 0,
  //     totalNutritionistOrders: 0,
  //     totalOrders: 0,
  //   });

  // const fetchData = async () => {
  //   try {
  //     const [
  //       usersResponse,
  //       nutritionistsResponse,
  //       nutritionistOrdersResponse,
  //       ordersResponse,
  //     ] = await Promise.all([
  //       getUsersFunction(),
  //       getNutritionistFunction(),
  //       getNutritionistOrders(),
  //       getUserOrders(),
  //     ]);

  //     setData({
  //       totalUser: usersResponse.data.users.length,
  //       totalNutritionists: nutritionistsResponse.data.allNutritionist.length,
  //       totalNutritionistOrders:
  //         nutritionistOrdersResponse.data.deliveredOrders.length,
  //       totalOrders: ordersResponse.data.deliveredOrders.length,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const cards = [
    {
      icon: <FaUsers />,
      name: "Total Users",
      number: 15,
    },
    {
      icon: <FaUsers />,
      name: "Total Nutritionists",
      number: 10,
    },
    {
      icon: <FaShoppingCart />,
      name: "Total Nutritionist Orders",
      number: 20,
    },
    {
      icon: <FaShoppingCart />,
      name: "Total Orders",
      number: 100,
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
