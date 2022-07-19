import { useEffect } from "react";
import { Suspense, lazy } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const Header = lazy(() => import("../../components/Header/Header"));
const Posts = lazy(() => import("../../components/Posts/Posts"));
const Sidebar = lazy(() => import("../../components/Sidebar/Sidebar"));

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Suspense fallback={LazyLoader}>
      <Header />
      <div className="container p-5">
        <div className="row">
          <Posts />
          <Sidebar />
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
