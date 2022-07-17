//internal import
import Categories from "../Categories/Categories";
import RecentPost from "../RecentPost/RecentPost";
import Tags from "../Tags/Tags";

const Sidebar = () => {
  return (
    <div className="sidebar col-md-4 px-5">
      <RecentPost />
      <Categories />
      <Tags />
    </div>
  );
};

export default Sidebar;
