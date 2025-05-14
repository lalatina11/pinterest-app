import { useTheme } from "@/lib/UseThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Moon, Sun } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props {
  setType: React.Dispatch<
    React.SetStateAction<"login" | "register" | "verify">
  >;
}

const LoginForm = (props: Props) => {
  const { setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="Card w-sm max-w-sm flex justify-center items-center relative">
      <CardHeader className="flex flex-col gap-3 justify-center items-center w-36 h-36">
        <img
          src="/public/logo-pin.svg"
          className="w-full h-auto object-cover"
        />
        <CardTitle className="text-nowrap">
          <span>Masuk ke akun Anda</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <span
          onClick={() => setTheme("dark")}
          className="block dark:hidden absolute top-5 right-5 cursor-pointer"
        >
          <Moon />
        </span>
        <span
          onClick={() => setTheme("light")}
          className="hidden dark:block absolute top-5 right-5 cursor-pointer"
        >
          <Sun />
        </span>
        <form className="space-y-6" action="">
          <div className="space-y-3">
            <Label htmlFor="identifier">Email atau Username</Label>
            <Input name="identifier" id="identifier" type="text" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
            />{" "}
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="show-password"
              id="show-password"
              onChange={(e) => setShowPassword(e.currentTarget.checked)}
            />
            <Label className="text-sm text-nowrap" htmlFor="show-password">
              Tampilkan Kata Sandi
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <span>Belum punya akun?</span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => props.setType("register")}
            >
              daftar di sini
            </span>
          </div>
          <Button className="w-full">Masuk</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
