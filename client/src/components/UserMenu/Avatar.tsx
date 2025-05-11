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
      <AvatarImage className={props.className} src={props.avatarUrl} />
      <AvatarFallback>
        <RxAvatar className={props.className} />
      </AvatarFallback>
    </AvatarShadcn>
  );
};

export default Avatar;
