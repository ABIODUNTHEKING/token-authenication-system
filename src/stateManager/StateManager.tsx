import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import retriveUsers from "../utilities/retriveUsers";
import { IAuthenicatedUserData } from "../Interfaces/interfaces";
import { IUserData } from "../Interfaces/interfaces";

export interface IValues {
  allUsersData: IUserData[];
  authenicatedUserInfo: IAuthenicatedUserData;
  setAuthenicatedUserInfo: React.Dispatch<
    React.SetStateAction<IAuthenicatedUserData>
  >;
  isUserAuthenicated: Boolean;
  setIsUserAuthenicated: React.Dispatch<React.SetStateAction<Boolean>>;
}

const StateManager = () => {
  const allUsersData = retriveUsers();

  const navigate = useNavigate()

  const [authenicatedUserInfo, setAuthenicatedUserInfo] =
    useState<IAuthenicatedUserData>({});

  const data: IAuthenicatedUserData = JSON.parse(
    localStorage.getItem("Authenicated User")!
  );

  useEffect(() => {
    let timeOutID: number;
    if (data && data.time != undefined) {
      timeOutID = setTimeout(() => {
        localStorage.removeItem("Authenicated User");
      }, data.time);
    }

    let currentTime = new Date().getTime();

    if (data && data.exp && data.exp <= currentTime) {
      localStorage.removeItem("Authenicated User");
      navigate("/sign-in")
    }

    return () => clearTimeout(timeOutID);
  }, [authenicatedUserInfo]);

  const [isUserAuthenicated, setIsUserAuthenicated] = useState<Boolean>(
    false || !!data
  );

  const values = {
    allUsersData,
    authenicatedUserInfo,
    setAuthenicatedUserInfo,
    isUserAuthenicated,
    setIsUserAuthenicated,
  };

  return <Outlet context={values} />;
};

export default StateManager;
