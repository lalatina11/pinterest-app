import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import VerifyForm from "@/components/Auth/VerifyForm";
import { useState } from "react";

const AuthPage = () => {
  const [type, setType] = useState<"login" | "register" | "verify">("login");
  return (
    <main className="min-h-screen overflow-y-auto flex justify-center items-center">
      {type === "login" ? (
        <LoginForm setType={setType} />
      ) : type === "register" ? (
        <RegisterForm setType={setType} />
      ) : (
        <VerifyForm setType={setType} />
      )}
    </main>
  );
};

export default AuthPage;
