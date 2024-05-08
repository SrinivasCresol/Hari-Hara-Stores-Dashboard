import Footer from "../Components/Common/Footer";
import Header from "../Components/Common/Header";
import SideMenu from "../Components/Common/SideMenu";

export default function Home() {
  return (
    <div className="flex">
      <SideMenu />
      <div className="w-full flex flex-col justify-between">
        <div>
          <Header />
        </div>
        <Footer />
      </div>
    </div>
  );
}
