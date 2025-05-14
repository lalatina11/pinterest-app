import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useState } from "react";

const AuthPage = () => {
  const [type, setType] = useState<"login" | "register" | "verify">("login");
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {type === "login" ? (
        <LoginForm setType={setType} />
      ) : (
        <RegisterForm setType={setType} />
      )}
    </div>
  );
};

export default AuthPage;
