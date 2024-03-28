import { IUserData } from "../Interfaces/interfaces";

function retriveUsers() {
  let allUsersData: IUserData[] = [];

  let data = localStorage.getItem("usersData");

  if (!!data) {
    allUsersData = JSON.parse(data);
  }

  return allUsersData;
}

export default retriveUsers;
