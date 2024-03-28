import { IAuthenicatedUserData, IUserData } from "../Interfaces/interfaces";

const confirmUserExist = (
  allUsersData: IUserData[],
  userData: IAuthenicatedUserData,
  passwordCheck: boolean
) => {
  let userExist = allUsersData.find((data) => {
    if (passwordCheck) {
      return (
        data.email === userData.email && data.password === userData.password
      );
    } else {
      return data.email === userData?.email;
    }
  });

  return userExist;
};

export default confirmUserExist;
