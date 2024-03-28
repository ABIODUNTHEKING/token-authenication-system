import { MouseEvent, ChangeEvent } from "react";

interface IInputProps {
  inputPlaceholder: string;
  inputType: string;
  inputName: string;
  inputValue?: string;
  buttonEventHandler?: (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => void;
  inputEventHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  focus?: boolean;

}

function Input({
  inputPlaceholder,
  inputType,
  inputName,
  buttonEventHandler,
  inputEventHandler,
  focus,
  inputValue
}: IInputProps) {
  return inputType === "submit" ? (
    <input
      type="submit"
      value={inputPlaceholder}
      name={inputName}
      onClick={buttonEventHandler}
      className=" block w-full p-3 bg-blue-2 placeholder-white  cursor-pointer text-white"
      id={inputName}
    />
  ) : (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      name={inputName}
      onChange={inputEventHandler}
      
      className=" block w-full  py-2 pl-3 pr-2 text-base mb-3 outline-none border-[1px] border-solid border-black bg-white"
      autoFocus={focus}
      value={inputValue}
      id={inputName}
    />
  );
}

export default Input;
