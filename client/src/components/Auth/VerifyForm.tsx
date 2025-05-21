import { useEffect, type FormEventHandler } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Label } from "../ui/label";
import { useNavigate } from "react-router";

const VerifyForm = () => {
  const navigate = useNavigate();
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    toast(new FormData(e.currentTarget).get("OTP")?.toString());
  };

  useEffect(() => {
    if (!sessionStorage.getItem("identifier")) {
      navigate("/auth?type=login");
    }
  }, [navigate]);

  return (
    <Card className="Card">
      <span className="flex text-xl font-semibold w-fit m-auto">
        Verify Your Registry
      </span>
      <CardContent>
        <form onSubmit={handleSubmitForm} className="max-w-sm space-y-3">
          <div className="flex justify-center items-center flex-col gap-3">
            <Label>Your OTP Code</Label>
            <InputOTP name="OTP" maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyForm;
