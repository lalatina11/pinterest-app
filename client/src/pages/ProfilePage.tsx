import Collection from "@/components/Collection";
import Gallery from "@/components/Gallery";
import Avatar from "@/components/UserMenu/Avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { toast } from "sonner";

const ProfilePage = () => {
  const { username } = useParams();
  const [mode, setMode] = useState<"created" | "saved">("created");
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <Card className="flex justify-center items-center max-w-sm w-sm mx-auto">
        <CardHeader className="flex flex-col gap-4 justify-center items-center w-full">
          <CardTitle>
            <Avatar avatarUrl="" className="w-14 h-14 object-cover" />
          </CardTitle>
          <CardDescription>{username}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>@{username}</p>
        </CardContent>
        <CardFooter className="flex w-full justify-around gap-4 items-center">
          <Button
            onClick={() => toast("Profile " + username + " berhasil dibagikan")}
          >
            <FaShareAlt />
          </Button>
          <Button
            onClick={() => toast("Profile " + username + " berhasil diikuti")}
          >
            Follow
          </Button>
          <Button
            onClick={() => toast("Profile " + username + " berhasil blokir")}
          >
            Block
          </Button>
          <Button onClick={() => toast("Fitur ini segera hadir")}>
            <CiCircleMore />
          </Button>
        </CardFooter>
      </Card>
      <div className="flex justify-center items-center gap-5 font-semibold">
        <span
          onClick={() => setMode("created")}
          className={`border-b-2 pb-1 transition-all ease-in-out duration-300 hover:text-zinc-500 ${
            mode === "created"
              ? "border-zinc-500 cursor-default"
              : "border-transparent cursor-pointer"
          }`}
        >
          Created
        </span>
        <span
          onClick={() => setMode("saved")}
          className={`border-b-2 pb-1 transition-all ease-in-out duration-300 hover:text-zinc-500 ${
            mode === "saved"
              ? "border-zinc-500 cursor-default"
              : "border-transparent cursor-pointer"
          }`}
        >
          Saved
        </span>
      </div>
      <div className="my-4">
        {mode === "created" ? <Gallery /> : <Collection />}
      </div>
    </div>
  );
};

export default ProfilePage;
