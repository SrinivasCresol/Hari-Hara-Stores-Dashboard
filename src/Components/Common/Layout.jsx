import SideMenu from "./SideMenu";
import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SideMenu />
      <div className="w-full flex flex-col justify-between">
        <div>
          <Header />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
