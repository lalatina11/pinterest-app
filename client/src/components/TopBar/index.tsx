import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import UserMenu from "../UserMenu";

const TopBar = () => {
  return (
    <div className="my-4 flex items-center gap-4">
      {/* SEARCH */}
      <div className="relative flex-1">
        <button className="absolute top-3 left-4">
          <FaSearch />
        </button>
        <Input
          type="text"
          className="px-12"
          placeholder="Search.."
          name=""
          id=""
        />
      </div>
      {/* USER */}
      <UserMenu />
    </div>
  );
};

export default TopBar;
