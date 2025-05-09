import { RxAvatar } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import UserDropDown from "./UserDropDown";

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
      <a href="/" className={"" + buttonVariants({ variant: "default" })}>
        Login
      </a>
    </div>
  );
};

export default UserMenu;
