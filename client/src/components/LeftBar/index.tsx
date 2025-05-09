import { FaRegPlusSquare } from "react-icons/fa";
import { ImSafari } from "react-icons/im";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { ModeToggle } from "../ModeToggle";

const navItem = [
  {
    name: "logo",
    href: "/",
    element: (
      <img className="w-6 h-6 object-cover" src="logo-pin.svg" alt="Logo" />
    ),
  },
  {
    name: "home",
    href: "/",
    element: <ImSafari className="w-6 h-6 object-cover" />,
  },
  {
    name: "create",
    href: "/",
    element: <FaRegPlusSquare className="w-6 h-6 object-cover" />,
  },
  {
    name: "update",
    href: "/",
    element: <IoNotificationsSharp className="w-6 h-6 object-cover" />,
  },
  {
    name: "message",
    href: "/",
    element: <MdOutlineMessage className="w-6 h-6 object-cover" />,
  },
];

const LeftBar = () => {
  return (
    <div className="flex flex-col justify-between h-screen items-center sticky top-0 w-[72px] py-4 border-r border-zinc-500">
      <div className="flex flex-col gap-6 items-center">
        {navItem.map((data) => (
          <a
            key={data.name}
            className="w-12 h-12 flex justify-center items-center hover:scale-110 transition-all ease-in-out duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md"
            href={data.href}
          >
            {data.element}
          </a>
        ))}
        <div className="w-12 h-12 flex justify-center items-center hover:scale-110 transition-all ease-in-out duration-300 rounded-md">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
