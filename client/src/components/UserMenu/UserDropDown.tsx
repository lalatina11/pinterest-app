import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { apiRequest } from "@/lib";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/utils/zustandStores";

const UserDropDown = () => {
  const navigate = useNavigate();
  const { removeCurrentUser } = useAuthStore();
  const handleLogout: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await apiRequest.post("/api/users/logout");
    removeCurrentUser();
    toast("Logout berhasil!");
    navigate("/auth?type=login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-zinc-500 rounded-md p-1 shadow shadow-zinc-500">
        <IoIosArrowDown className="cursor-pointer w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-md shadow-zinc-500 border border-zinc-500">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Setting</DropdownMenuItem>
        <DropdownMenuItem>
          <form onSubmit={handleLogout}>
            <button>Logout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
