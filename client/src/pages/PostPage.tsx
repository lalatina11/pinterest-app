import Comments from "@/components/Comments";
import Gallery from "@/components/Gallery";
import ImageRenderer from "@/components/Gallery/ImageRenderer";
import Metadata from "@/components/Metadata";
import PostInterraction from "@/components/PostInterraction";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/UserMenu/Avatar";
import { ArrowLeft } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Metadata title="Pin | Single" />
      <div className="flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="flex-0 lg:flex-0">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
          </div>
          <div className="flex-1/3 lg:flex-1/3">
            <ImageRenderer
              imageUrl={`/Pins/pin${id}.jpeg`}
              className="w-full m-auto rounded-md"
              width={736}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1/3">
            <PostInterraction />
            <NavLink
              to={"/profile/johndoe"}
              className="flex gap-2 items-center w-fit"
            >
              <Avatar avatarUrl="" className="w-8 h-8" />
              <span className="text-sm lg:text-lg">John Doe</span>
            </NavLink>
            <div className="w-full h-[1px] bg-zinc-500" />
            <Comments />
          </div>
        </div>
        <div className="w-full h-[1px] bg-zinc-500" />
        <Gallery />
      </div>
    </>
  );
};

export default PostPage;
