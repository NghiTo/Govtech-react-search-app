import Header from "../Header/Header";
import Search from "../Search/Search";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Search />
    </div>
  );
};

export default HomeLayout;
