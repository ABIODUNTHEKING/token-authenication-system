import { JwtPayload, jwtDecode } from "jwt-decode";
import retrieveToken from "./retriveToken";
import { IAuthenicatedUserData, IUserData } from "../Interfaces/interfaces";
import { NavigateFunction } from "react-router-dom";

interface IStoredToken extends JwtPayload {
  userData: IAuthenicatedUserData;
}

interface IStoreTokenProps {
  userExist: IUserData;
  setAuthenicatedUserInfo: React.Dispatch<
    React.SetStateAction<IAuthenicatedUserData>
  >;
  navigate: NavigateFunction;
}

const storeToken = async ({
  userExist,
  setAuthenicatedUserInfo,
  navigate,
}: IStoreTokenProps) => {
  const token = await retrieveToken(userExist);
  const decoded: IStoredToken = jwtDecode(token);

  let value;

  if (decoded.iat && decoded.exp) {
    let iat = decoded.iat * 1000;
    let exp = decoded.exp * 1000;
    const timeOfCreation = new Date(iat).getTime();
    const timeOfExpiration = new Date(exp).getTime();

    decoded.userData.time = timeOfExpiration - timeOfCreation;
    decoded.userData.exp = exp;

    setAuthenicatedUserInfo(decoded.userData);

    localStorage.setItem("Authenicated User", JSON.stringify(decoded.userData));

    if (decoded.userData.exp) {
      navigate("/");
    }
  }

  return value;
};

export default storeToken;
