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
    <AvatarShadcn className={props.className}>
      <AvatarImage src={props.avatarUrl} />
      <AvatarFallback>
        <RxAvatar />
      </AvatarFallback>
    </AvatarShadcn>
  );
};

export default Avatar;
