import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarShadcn,
} from "../ui/avatar";
import { RxAvatar } from "react-icons/rx";

interface Props {
  className?: string;
  avatarUrl: string;
}

const Avatar = (props: Props) => {
  return (
    <AvatarShadcn>
      <AvatarImage
        className={props.className || "w-8 h-8"}
        src={props.avatarUrl}
      />
      <AvatarFallback>
        <RxAvatar className={props.className || "w-8 h-8"} />
      </AvatarFallback>
    </AvatarShadcn>
  );
};

export default Avatar;
