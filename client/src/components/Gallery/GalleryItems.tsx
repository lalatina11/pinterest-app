import { noImageUrl } from "@/lib/dummyData";
import type { TempItems } from "@/types";

interface Props {
  item: TempItems;
}
const GalleryItems = (props: Props) => {
  const { item } = props;
  return (
    <div
      className="flex hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <img
        src={item.imageUrl || noImageUrl}
        alt=""
        className="w-full h-auto object-cover rounded"
      />
    </div>
  );
};

export default GalleryItems;
