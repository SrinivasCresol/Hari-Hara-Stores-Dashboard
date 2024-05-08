import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="p-4 bg-white mt-6">
      <p>
        {`Copyright © ${new Date().getFullYear()}`}{" "}
        <span>
          <Link
            to="/"
            className="text-blue-500 font-bold hover:text-blue-600 cursor-pointer"
          >
            Hari Hara Store Dashboard
          </Link>
        </span>{" "}
        All rights reserved.
      </p>
    </div>
  );
}
