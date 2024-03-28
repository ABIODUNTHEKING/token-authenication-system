import { useEffect, MouseEvent, Dispatch, SetStateAction } from "react";
import Input from "./Input";

interface IChangePasswordProps {
  userPassword: string;
  setUserPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  handleSubmit: (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => void;
}

function ChangePassword({
  handleSubmit,
  userPassword,
  setUserPassword,
  confirmPassword,
  setConfirmPassword
}: IChangePasswordProps) {
  let allUsersData: {
    password: string;
    email: string;
  }[] = [];

  useEffect(() => {
    let data = localStorage.getItem("usersData");

    if (data) {
      allUsersData.push(JSON.parse(data));
    }
  }, []);

  return (
    <form className="rounded-xl">
      <label htmlFor="password">Password</label>
      <Input
        inputPlaceholder="Enter in a new password"
        inputName="password"
        inputType="password"
        inputEventHandler={(e) => setUserPassword(e.target.value)}
        inputValue={userPassword}
        focus
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <Input
        inputPlaceholder="Confirm new password"
        inputName="confirmPassword"
        inputType="confirmPassword"
        inputEventHandler={(e) => setConfirmPassword(e.target.value)}
        inputValue={confirmPassword}
        focus
      />
      <Input
        inputType="submit"
        inputName="sign-in"
        inputPlaceholder="Update"
        buttonEventHandler={handleSubmit}
      />
    </form>
  );
}

export default ChangePassword;
