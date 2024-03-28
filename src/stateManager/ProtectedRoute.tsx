import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { IValues } from "./StateManager";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isUserAuthenicated, authenicatedUserInfo }: IValues =
    useOutletContext();

  if (isUserAuthenicated) {
    return <Outlet context={authenicatedUserInfo} />;
  } else {
    toast.error("Please sign in");
    return <Navigate to="sign-in" />;
  }
};
export default ProtectedRoute;
