import { ChangeEvent, useState, MouseEvent } from "react";
import Input from "../../components/Input";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import confirmUserExist from "../../utilities/confirmUserExist";
import storeToken from "../../utilities/storeToken";
import { IValues } from "../../stateManager/StateManager";
import retriveUsers from "../../utilities/retriveUsers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  let { setAuthenicatedUserInfo, setIsUserAuthenicated }: IValues =
    useOutletContext();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    let allUsersData = retriveUsers();
    let userExist = confirmUserExist(allUsersData, userData, true);
    if (userExist) {
      storeToken({ userExist, setAuthenicatedUserInfo, navigate });

      setIsUserAuthenicated(true);

      // navigate("/");
    } else {
      toast.error("Invalid password or email");
    }
  };

  return (
    <section className=" flex flex-col h-screen w-screen justify-center items-center">
      <div className="w-96 shadow-lg rounded p-5 py-12">
        <h2 className="font-semibold text-2xl">Sign In</h2>
        <p>
          or{" "}
          <Link to="/sign-up" className=" text-blue-1 text-lg font-light">
            create an account
          </Link>
        </p>
        <form className="rounded-xl">
          <label htmlFor="email">Email</label>
          <Input
            inputPlaceholder="Email"
            inputName="email"
            inputType="email"
            inputEventHandler={handleChange}
            inputValue={userData.email}
            focus
          />
          <label htmlFor="password">Password</label>
          <Input
            inputPlaceholder="Password"
            inputName="password"
            inputType="password"
            inputEventHandler={handleChange}
            inputValue={userData.password}
          />
          <Input
            inputType="submit"
            inputName="sign-in"
            inputPlaceholder="Sign In"
            buttonEventHandler={handleSubmit}
          />
        </form>
        <Link
          to="/forgot-password"
          className="  text-right flex justify-end mt-1"
        >
          Forgot Password?
        </Link>
      </div>
    </section>
  );
}

export default SignIn;
