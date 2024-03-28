import { useEffect, useState } from "react";
import { IAuthenicatedUserData } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";

function Home() {
  const authenicatedUserInfo: IAuthenicatedUserData = useOutletContext();
  let [value, setValue] = useState<IAuthenicatedUserData>({});
  useEffect(() => {
    setValue(
      JSON.parse(localStorage.getItem("Authenicated User")!) ||
        authenicatedUserInfo
    );
  }, [authenicatedUserInfo]);


  return <div>Hi, {value.name}</div>;
}

export default Home;
