import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState, MouseEvent } from "react";
import ForgottenEmail from "../../components/ForgottenEmail";
import ChangePassword from "../../components/ChangePassword";
import { IValues } from "../../stateManager/StateManager";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  let { allUsersData }: IValues = useOutletContext();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState(1);

  const handleSubmit = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    let userExist = allUsersData.find((data) => userEmail == data.email);

    if (userExist) {
      setForm((prevForm) => prevForm + 1);
    } else {
      toast.error("Account do not exist");
    }

    if (form == 2 && userExist) {
      userExist = { ...userExist, password: userPassword };
      if (userPassword == confirmPassword) {
        allUsersData.map((user) => {
          if (user.email == userExist?.email) {
            user.password = userExist.password;
          }
        });

        localStorage.setItem("usersData", JSON.stringify(allUsersData));
        navigate("/sign-in");
      } else {
        toast.error("Passwords do not match");
      }
    }
  };

  const formChecker = () => {
    if (form == 1) {
      return (
        <ForgottenEmail
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          handleSubmit={handleSubmit}
        />
      );
    } else {
      return (
        <ChangePassword
          handleSubmit={handleSubmit}
          userPassword={userPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setUserPassword={setUserPasword}
        />
      );
    }
  };

  return (
    <section className=" flex flex-col h-screen w-screen justify-center items-center">
      <div className="w-96 shadow-lg rounded p-5 py-12">
        <h2 className="font-semibold text-2xl">Forgot Password</h2>
        {form === 1 && (
          <p>
            or{" "}
            <Link to="/sign-up" className=" text-blue-1 text-lg font-light">
              create an account
            </Link>
          </p>
        )}
        {formChecker()}
      </div>
    </section>
  );
}

export default ForgotPassword;
