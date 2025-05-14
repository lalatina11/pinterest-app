import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { noImageUrl } from "@/lib/dummyData";
import { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const CreatePage = () => {
  const [imagePreview, setImagePreview] = useState({
    url: "",
    width: 0,
    height: 0,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <main className="space-y-10 pb-20">
      <div className="flex justify-between items-center p-2 border border-zinc-500">
        <h1>Create Pin</h1>
        <Button>Publish</Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <Card
          hidden={!!imagePreview.url}
          className="max-w-sm m-auto lg:m-0 w-fit h-fit Card"
        >
          <CardContent>
            <div className="space-y-3">
              <Label className="w-fit mx-auto cursor-pointer" htmlFor="img">
                <IoMdCloudUpload className="h-14 w-14" />
              </Label>
              <Input
                ref={imageInputRef}
                onChange={(e) => {
                  const file = e?.target?.files?.[0];
                  if (file) {
                    setImagePreview({
                      url: URL.createObjectURL(file || ""),
                      width: 300,
                      height: 300,
                    });
                  }
                }}
                defaultValue={imagePreview.url}
                hidden
                type="file"
                accept="image/*"
                name=""
                id="img"
              />
              <span>
                We recommend using high quality .jpg files less than 20 MB or
                .mp4 files less than 200 MB.
              </span>
            </div>
          </CardContent>
        </Card>
        <div
          className="max-w-sm p-3 md:p-0 relative m-auto"
          hidden={!imagePreview.url}
        >
          {/* RESET IMAGE BUTTON */}
          <Button
            onClick={() => {
              setImagePreview({
                url: "",
                width: 0,
                height: 0,
              });
              if (imageInputRef.current?.value) {
                imageInputRef.current.value = "";
              }
            }}
            className={
              "absolute -top-1 -right-1 md:-top-5 md:-right-5 cursor-pointer" +
              buttonVariants({ variant: "destructive" })
            }
          >
            X
          </Button>
          <Label htmlFor="img">
            <img
              src={imagePreview.url || noImageUrl}
              width={imagePreview.width}
              height={imagePreview.height}
              className="rounded-md w-full h-auto object-cover"
            />
          </Label>
        </div>
        <Card className="Card flex-1">
          <CardContent>
            <form className="capitalize space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title">title</Label>
                <Input type="text" name="title" id="title" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="desc">description</Label>
                <Textarea rows={6} name="description" id="desc" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="link">link</Label>
                <Input type="url" name="link" id="link" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="board">Board</Label>
                <Select>
                  <SelectTrigger id="board">
                    <SelectValue placeholder="Board" id="board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem disabled value=".">
                      Choose a board
                    </SelectItem>
                    <SelectItem value="board1">board1</SelectItem>
                    <SelectItem value="board2">board2</SelectItem>
                    <SelectItem value="board3">board3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="tags">tags</Label>
                <Input type="text" name="tags" id="tags" />
                <span className="text-xs text-green-500">
                  don't worry, poeple don't see your tags
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CreatePage;
