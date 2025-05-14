import { useState } from "react";
import { useTheme } from "@/lib/UseThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Moon, Sun } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  setType: React.Dispatch<
    React.SetStateAction<"login" | "register" | "verify">
  >;
}

const RegisterForm = (props: Props) => {
  const { setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="Card w-sm max-w-sm flex justify-center items-center relative mb-10 mt-5">
      <CardHeader className="flex flex-col gap-3 justify-center items-center w-36 h-36">
        <img
          src="/public/logo-pin.svg"
          className="w-full h-auto object-cover"
        />
        <CardTitle className="text-nowrap">
          <span>Daftarkan akun Anda</span>
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
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" type="text" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="name">Nama</Label>
            <Input name="name" id="name" type="text" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
            />
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
            <span>Sudah punya akun?</span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => props.setType("login")}
            >
              login di sini
            </span>
          </div>
          <Button className="w-full">Daftar sekarang</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
