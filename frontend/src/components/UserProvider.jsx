import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import useAuthUser from "../hooks/useAuthUser";

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { authUser } = useAuthUser();

  useEffect(() => {
    if (authUser) {
      dispatch(setUser(authUser));
    } else {
      dispatch(setUser(null));
    }
  }, [authUser, dispatch]);

  return children;
};

export default UserProvider;
