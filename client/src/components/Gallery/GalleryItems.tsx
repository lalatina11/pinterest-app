import { noImageUrl } from "@/lib/dummyData";
import type { TempItems } from "@/types";

interface Props {
  item: TempItems;
}
const GalleryItems = (props: Props) => {
  const { item } = props;
  return (
    <div
      className="flex"
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
