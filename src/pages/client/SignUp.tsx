import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { Link, useOutletContext } from "react-router-dom";
import Input from "../../components/Input";
import confirmUserExist from "../../utilities/confirmUserExist";
import { IValues } from "../../stateManager/StateManager";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const { allUsersData }: IValues = useOutletContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    password: "",
    email: "",
    name: "",
    category: "Student",
  });

  const [confirmedPassword, setConfirmedPassword] = useState("");

  let user = confirmUserExist(allUsersData, userData, false);

  const [isDataSaved, setIsDataSaved] = useState(false);

  useEffect(() => {
    if (userData.password != "" && userData.email != "" && !user) {
      allUsersData.push(userData);
      localStorage.setItem("usersData", JSON.stringify(allUsersData));
      setUserData({ password: "", email: "", name: "", category: "" });
      setConfirmedPassword("");
      navigate("/sign-in");
    }
  }, [isDataSaved]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
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

    if (confirmedPassword !== userData.password) {
      toast.error("Passwords do not match");
    } else if (user) {
      toast.error("Account already exists");
    } else {
      setIsDataSaved((prevStatus) => !prevStatus);
    }
  };

  return (
    <section className=" flex flex-col h-screen w-screen justify-center items-center">
      <div className="w-96 shadow-lg rounded p-5 py-12">
        <h2 className="font-semibold text-2xl">Register</h2>
        <p className="mb-3">
          Already have an account?{" "}
          <Link to="/sign-in" className=" text-blue-1 text-lg font-light">
            Sign-in
          </Link>
        </p>
        <form className="rounded-xl">
          <label htmlFor="name">Name</label>
          <Input
            inputPlaceholder="Name"
            inputName="name"
            inputType="name"
            inputEventHandler={handleChange}
            inputValue={userData.name}
            focus
          />
          <label htmlFor="email">Email</label>
          <Input
            inputPlaceholder="Email"
            inputName="email"
            inputType="email"
            inputEventHandler={handleChange}
            inputValue={userData.email}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={userData.category}
            onChange={handleChange}
            className="block w-full my-2 border-[1px] border-solid border-black px-2 py-3 outline-none"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <label htmlFor="password">Password</label>
          <Input
            inputPlaceholder="Password"
            inputName="password"
            inputType="password"
            inputEventHandler={handleChange}
            inputValue={userData.password}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            inputPlaceholder="Confirm Password"
            inputName="confirmPassword"
            inputType="password"
            inputEventHandler={(e) => setConfirmedPassword(e.target.value)}
            inputValue={confirmedPassword}
          />
          <Input
            inputType="submit"
            inputName="sign-in"
            inputPlaceholder="Register"
            buttonEventHandler={handleSubmit}
          />
        </form>
      </div>
    </section>
  );
}

export default SignUp;
