import { Dispatch, SetStateAction, MouseEvent } from "react";
import Input from "./Input";


interface IForgottenEmail {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void
}

function ForgottenEmail({ userEmail, setUserEmail, handleSubmit }: IForgottenEmail) {
 
  return (
    <form className="rounded-xl">
      <label htmlFor="email">Email</label>
      <Input
        inputPlaceholder="Email"
        inputName="email"
        inputType="email"
        inputEventHandler={(e) => setUserEmail(e.target.value)}
        inputValue={userEmail}
        focus
      />
      <Input
        inputType="submit"
        inputName="sign-in"
        inputPlaceholder="Search"
        buttonEventHandler={handleSubmit}
      />
    </form>
  );
}

export default ForgottenEmail;
