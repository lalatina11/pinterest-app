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

const LoginForm = (props: Props) => {
  const { setTheme } = useTheme();
  return (
    <Card className="Card w-sm max-w-sm flex justify-center items-center relative">
      <CardHeader className="flex flex-col gap-3 justify-center items-center w-36 h-36">
        <img
          src="/public/logo-pin.svg"
          className="w-full h-auto object-cover"
        />
        <CardTitle className="text-nowrap">
          <span>Login to your account</span>
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
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" />
          </div>
          <div className="flex gap-2 items-center">
            <span>Don&apos;t have an Account?</span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => props.setType("register")}
            >
              register here
            </span>
          </div>
          <Button className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
