import { useEffect, useRef, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import {
  notificationByStoreIDFunction,
  updateOrderStatusFunction,
} from "../../Services/Apis";
import { useNavigate } from "react-router-dom";

export default function DropDownMessage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const storeID = sessionStorage.getItem("storeID");
  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `${token}`,
  };

  const fetchNotifications = async () => {
    try {
      const response = await notificationByStoreIDFunction(storeID);
      if (response.status === 200) {
        setNotifications(response.data.pendingOrders);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleAccept = async (notificationID) => {
    try {
      await updateOrderStatusFunction(
        notificationID,
        {
          newStatus: "Accepted",
          newReadStatus: "Read",
        },
        headers
      );
      fetchNotifications();
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  const handleDecline = async (notificationID) => {
    try {
      await updateOrderStatusFunction(
        notificationID,
        {
          newStatus: "Declined",
          newReadStatus: "NotRead",
        },
        headers
      );
      fetchNotifications();
    } catch (error) {
      console.error("Error declining notification:", error);
    }
  };

  const handleViewDetails = async (id) => {
    navigate(`/order/details/${id}`);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative z-[999]">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative cursor-pointer"
      >
        <AiFillBell className="text-base" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            •
          </span>
        )}
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-[#2E3A47] dark:bg-[#24303F] sm:right-0 sm:w-80 p-2 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notifications</h5>
        </div>

        <ul className="flex h-60 flex-col overflow-y-auto no-scrollbar">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li
                key={notification._id}
                className="border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-[#2E3A47] dark:hover:bg-meta-4"
              >
                <div className="flex flex-col gap-2.5">
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      {notification.message}
                    </span>
                  </p>
                  <p className="text-xs">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAccept(notification.notificationID)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDecline(notification.notificationID)}
                    >
                      Decline
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleViewDetails(notification.orderID)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="border-t border-stroke px-4.5 py-3">
              <p className="text-sm">No new notifications</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
