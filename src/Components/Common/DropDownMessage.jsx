import { useEffect, useRef, useState } from "react";
import { AiFillBell } from "react-icons/ai";

export default function DropDownMessage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
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

  // close if the esc key is pressed
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
        className="cursor-pointer"
      >
        <AiFillBell className="text-base" />
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
          <li>
            <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-[#2E3A47] dark:hover:bg-meta-4">
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  Edit your information in a swipe
                </span>{" "}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-[#2E3A47] dark:hover:bg-meta-4">
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  It is a long established fact
                </span>{" "}
                that a reader will be distracted by the readable.
              </p>

              <p className="text-xs">24 Feb, 2025</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-[#2E3A47] dark:hover:bg-meta-4">
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  There are many variations
                </span>{" "}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs">04 Jan, 2025</p>
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-[#2E3A47] dark:hover:bg-meta-4">
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  There are many variations
                </span>{" "}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs">01 Dec, 2024</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
