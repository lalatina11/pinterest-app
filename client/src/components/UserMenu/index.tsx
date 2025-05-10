import { RxAvatar } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import UserDropDown from "./UserDropDown";
import { Link } from "react-router";

const UserMenu = () => {
  const currentUser = true;
  return currentUser ? (
    <div className={"flex gap-4 items-center"}>
      <Avatar className="hidden md:block">
        <AvatarImage src="https://avatars.githubusercontent.com/u/178248680?v=4" />
        <AvatarFallback>
          <RxAvatar />
        </AvatarFallback>
      </Avatar>
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
