import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";

const UserMenu = () => {
  const currentUser = true;
  return currentUser ? (
    <div className={"flex gap-4 items-center"}>
      <Avatar
        className="hidden md:block"
        avatarUrl="https://avatars.githubusercontent.com/u/178248680?v=4"
      />
      <UserDropDown />
    </div>
  ) : (
    <div>
      <Link to="/" className={"" + buttonVariants({ variant: "default" })}>
        Login
      </Link>
    </div>
  );
};

export default UserMenu;
