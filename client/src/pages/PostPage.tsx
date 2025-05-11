import ImageRenderer from "@/components/Gallery/ImageRenderer";
import Metadata from "@/components/Metadata";

const PostPage = () => {
  return (
    <>
      <Metadata title="Pin | Single" />
      <div>
        <div>
          <div className="w-[70%] lg:w-1/4 m-auto">
            <ImageRenderer imageUrl="/Pins/pin1.jpeg" width={736} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
